import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { X, Trash2, Edit2, Plus, Check, Lock, Palette, ChevronDown, ChevronRight, GripVertical, ArrowDownAZ, ArrowUpDown, ArrowRightLeft, CornerDownRight } from 'lucide-react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Category, SubCategory } from '../types';
import Icon from './Icon';
import IconSelector from './IconSelector';
import CategoryActionAuthModal from './CategoryActionAuthModal';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onUpdateCategories: (newCategories: Category[]) => void;
  onDeleteCategory: (id: string) => void;
  onMoveSubCategory?: (fromCategoryId: string, subCategoryId: string, toCategoryId: string) => void;
  onDemoteCategoryToSubCategory?: (fromCategoryId: string, toCategoryId: string) => void;
  onVerifyPassword?: (password: string) => Promise<boolean>;
}

const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onUpdateCategories,
  onDeleteCategory,
  onMoveSubCategory,
  onDemoteCategoryToSubCategory,
  onVerifyPassword
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editIcon, setEditIcon] = useState('');
  
  const [newCatName, setNewCatName] = useState('');
  const [newCatPassword, setNewCatPassword] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Folder');
  
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [iconSelectorTarget, setIconSelectorTarget] = useState<'edit' | 'new' | 'subEdit' | 'subNew' | null>(null);
  
  // 二级分类相关状态
  const [expandedCatIds, setExpandedCatIds] = useState<Set<string>>(new Set());
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [editSubName, setEditSubName] = useState('');
  const [editSubIcon, setEditSubIcon] = useState('');
  const [newSubCatName, setNewSubCatName] = useState('');
  const [newSubCatIcon, setNewSubCatIcon] = useState('Tag');
  const [addingSubToCatId, setAddingSubToCatId] = useState<string | null>(null);
  const [isCategorySorting, setIsCategorySorting] = useState(false);
  const [sortingSubCatId, setSortingSubCatId] = useState<string | null>(null);
  const [movingSub, setMovingSub] = useState<{ fromCatId: string; subId: string } | null>(null);
  const [moveTargetCatId, setMoveTargetCatId] = useState<string>('');
  const [demotingCatId, setDemotingCatId] = useState<string | null>(null);
  const [demoteTargetCatId, setDemoteTargetCatId] = useState<string>('');
  const [demoteConfirm, setDemoteConfirm] = useState<{ fromCatId: string; toCatId: string } | null>(null);

  const listScrollRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollFixRef = useRef<{ scrollTop: number; catId: string } | null>(null);
  
  // 分类操作验证相关状态
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'edit' | 'delete';
    categoryId: string;
    categoryName: string;
  } | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 }
    })
  );

  const categoryNameMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach(c => map.set(c.id, c.name));
    return map;
  }, [categories]);

  const captureListScroll = (catId: string) => {
    if (!listScrollRef.current) return;
    pendingScrollFixRef.current = { scrollTop: listScrollRef.current.scrollTop, catId };
  };

  useLayoutEffect(() => {
    if (!pendingScrollFixRef.current) return;
    const { scrollTop, catId } = pendingScrollFixRef.current;
    pendingScrollFixRef.current = null;

    if (listScrollRef.current) {
      listScrollRef.current.scrollTop = scrollTop;
    }

    const el = document.getElementById(`cat-card-${catId}`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [expandedCatIds, editingId, editingSubId, addingSubToCatId, movingSub, demotingCatId, demoteConfirm]);

  if (!isOpen) return null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    // Category reorder
    if (activeId.startsWith('cat:')) {
      if (!isCategorySorting) return;
      const activeCatId = activeId.slice('cat:'.length);
      if (activeCatId === 'common') return;

      const overCatId = overId.startsWith('cat:')
        ? overId.slice('cat:'.length)
        : overId.startsWith('sub:')
          ? overId.split(':')[1]
          : '';

      if (!overCatId) return;

      const activeIndex = categories.findIndex(c => c.id === activeCatId);
      const overIndexRaw = categories.findIndex(c => c.id === overCatId);
      if (activeIndex < 0 || overIndexRaw < 0) return;
      const overIndex = overCatId === 'common' ? 1 : overIndexRaw;

      const moved = arrayMove<Category>(categories, activeIndex, overIndex);
      const commonIndex = moved.findIndex(c => c.id === 'common');
      if (commonIndex > 0) {
        const next = [...moved];
        const [common] = next.splice(commonIndex, 1);
        next.unshift(common);
        onUpdateCategories(next);
        return;
      }
      onUpdateCategories(moved);
      return;
    }

    // Subcategory reorder (only within same parent category)
    if (activeId.startsWith('sub:') && overId.startsWith('sub:')) {
      const [, activeCatId, activeSubId] = activeId.split(':');
      const [, overCatId, overSubId] = overId.split(':');
      if (!activeCatId || !overCatId || activeCatId !== overCatId) return;
      if (sortingSubCatId !== activeCatId) return;

      const newCats = categories.map(c => {
        if (c.id !== activeCatId) return c;
        const current = c.subcategories || [];
        const activeIndex = current.findIndex(s => s.id === activeSubId);
        const overIndex = current.findIndex(s => s.id === overSubId);
        if (activeIndex < 0 || overIndex < 0) return c;
        return { ...c, subcategories: arrayMove<SubCategory>(current, activeIndex, overIndex) };
      });

      onUpdateCategories(newCats);
    }
  };

  // 处理密码验证
  const handlePasswordVerification = async (password: string): Promise<boolean> => {
    if (!onVerifyPassword) return true; // 如果没有提供验证函数，默认通过
    
    try {
      const isValid = await onVerifyPassword(password);
      return isValid;
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  };

  // 处理编辑分类前的验证
  const handleStartEdit = (cat: Category) => {
    if (!onVerifyPassword) {
      // 如果没有提供验证函数，直接编辑
      startEdit(cat);
      return;
    }

    // 设置待处理的操作
    setPendingAction({
      type: 'edit',
      categoryId: cat.id,
      categoryName: cat.name
    });
    
    // 打开验证弹窗
    setIsAuthModalOpen(true);
  };

  // 处理删除分类前的验证
  const handleDeleteClick = (cat: Category) => {
    if (!onVerifyPassword) {
      // 如果没有提供验证函数，直接删除
      if (confirm(`确定删除"${cat.name}"分类吗？该分类下的书签将移动到"常用推荐"。`)) {
        onDeleteCategory(cat.id);
      }
      return;
    }

    // 设置待处理的操作
    setPendingAction({
      type: 'delete',
      categoryId: cat.id,
      categoryName: cat.name
    });
    
    // 打开验证弹窗
    setIsAuthModalOpen(true);
  };

  // 处理验证成功后的操作
  const handleAuthSuccess = () => {
    if (!pendingAction) return;

    if (pendingAction.type === 'edit') {
      const cat = categories.find(c => c.id === pendingAction.categoryId);
      if (cat) {
        startEdit(cat);
      }
    } else if (pendingAction.type === 'delete') {
      const cat = categories.find(c => c.id === pendingAction.categoryId);
      if (cat && confirm(`确定删除"${cat.name}"分类吗？该分类下的书签将移动到"常用推荐"。`)) {
        onDeleteCategory(cat.id);
      }
    }

    // 清除待处理的操作
    setPendingAction(null);
  };

  // 处理验证弹窗关闭
  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  };

  const startEdit = (cat: Category) => {
    captureListScroll(cat.id);
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditPassword(cat.password || '');
    setEditIcon(cat.icon);
  };

  const saveEdit = () => {
    if (!editingId || !editName.trim()) return;
    const newCats = categories.map(c => c.id === editingId ? { 
        ...c, 
        name: editName.trim(),
        icon: editIcon,
        password: editPassword.trim() || undefined
    } : c);
    onUpdateCategories(newCats);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!newCatName.trim()) return;
    const newCat: Category = {
      id: Date.now().toString(),
      name: newCatName.trim(),
      icon: newCatIcon,
      password: newCatPassword.trim() || undefined
    };
    onUpdateCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatPassword('');
    setNewCatIcon('Folder');
  };

  const openIconSelector = (target: 'edit' | 'new') => {
    setIconSelectorTarget(target);
    setIsIconSelectorOpen(true);
  };
  
  const handleIconSelect = (iconName: string) => {
    if (iconSelectorTarget === 'edit') {
      setEditIcon(iconName);
    } else if (iconSelectorTarget === 'new') {
      setNewCatIcon(iconName);
    } else if (iconSelectorTarget === 'subEdit') {
      setEditSubIcon(iconName);
    } else if (iconSelectorTarget === 'subNew') {
      setNewSubCatIcon(iconName);
    }
  };
  
  // 切换分类展开/折叠
  const toggleCategoryExpand = (catId: string) => {
    captureListScroll(catId);
    setExpandedCatIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(catId)) {
        newSet.delete(catId);
      } else {
        newSet.add(catId);
      }
      return newSet;
    });
  };
  
  // 开始添加二级分类
  const startAddSubCategory = (catId: string) => {
    captureListScroll(catId);
    setAddingSubToCatId(catId);
    setNewSubCatName('');
    setNewSubCatIcon('Tag');
    // 确保该分类展开
    setExpandedCatIds(prev => new Set(prev).add(catId));
  };
  
  // 添加二级分类
  const handleAddSubCategory = (catId: string) => {
    if (!newSubCatName.trim()) return;
    
    const newSubCat: SubCategory = {
      id: Date.now().toString(),
      name: newSubCatName.trim(),
      icon: newSubCatIcon
    };
    
    const newCats = categories.map(c => {
      if (c.id === catId) {
        return {
          ...c,
          subcategories: [...(c.subcategories || []), newSubCat]
        };
      }
      return c;
    });
    
    onUpdateCategories(newCats);
    setAddingSubToCatId(null);
    setNewSubCatName('');
    setNewSubCatIcon('Tag');
  };
  
  // 开始编辑二级分类
  const startEditSubCategory = (catId: string, sub: SubCategory) => {
    captureListScroll(catId);
    setEditingSubId(sub.id);
    setEditSubName(sub.name);
    setEditSubIcon(sub.icon);
  };
  
  // 保存编辑二级分类
  const saveEditSubCategory = (catId: string) => {
    if (!editingSubId || !editSubName.trim()) return;
    
    const newCats = categories.map(c => {
      if (c.id === catId && c.subcategories) {
        return {
          ...c,
          subcategories: c.subcategories.map(sub => 
            sub.id === editingSubId 
              ? { ...sub, name: editSubName.trim(), icon: editSubIcon }
              : sub
          )
        };
      }
      return c;
    });
    
    onUpdateCategories(newCats);
    setEditingSubId(null);
  };
  
  // 删除二级分类
  const deleteSubCategory = (catId: string, subId: string, subName: string) => {
    if (!confirm(`确定删除"${subName}"二级分类吗？`)) return;
    
    const newCats = categories.map(c => {
      if (c.id === catId && c.subcategories) {
        return {
          ...c,
          subcategories: c.subcategories.filter(sub => sub.id !== subId)
        };
      }
      return c;
    });
    
    onUpdateCategories(newCats);
  };

  const startMoveSubCategory = (fromCatId: string, subId: string) => {
    captureListScroll(fromCatId);
    const firstOther = categories.find(c => c.id !== fromCatId)?.id || '';
    setMovingSub({ fromCatId, subId });
    setMoveTargetCatId(firstOther);
  };

  const cancelMoveSubCategory = () => {
    setMovingSub(null);
    setMoveTargetCatId('');
  };

  const confirmMoveSubCategory = () => {
    if (!movingSub || !moveTargetCatId || movingSub.fromCatId === moveTargetCatId) return;
    if (!onMoveSubCategory) return;
    onMoveSubCategory(movingSub.fromCatId, movingSub.subId, moveTargetCatId);
    cancelMoveSubCategory();
  };

  const startDemoteCategory = (fromCategoryId: string) => {
    captureListScroll(fromCategoryId);
    const firstOther = categories.find(c => c.id !== fromCategoryId)?.id || '';
    setDemotingCatId(fromCategoryId);
    setDemoteTargetCatId(firstOther);
  };

  const cancelDemoteCategory = () => {
    setDemotingCatId(null);
    setDemoteTargetCatId('');
  };

  const confirmDemoteCategory = () => {
    if (!demotingCatId || !demoteTargetCatId || demotingCatId === demoteTargetCatId) return;
    if (!onDemoteCategoryToSubCategory) return;
    setDemoteConfirm({ fromCatId: demotingCatId, toCatId: demoteTargetCatId });
  };

  const toggleSubCategorySorting = (catId: string) => {
    setSortingSubCatId(prev => (prev === catId ? null : catId));
  };

  const autoSortSubCategories = (catId: string) => {
    const newCats = categories.map(c => {
      if (c.id !== catId) return c;
      const subcategories = [...(c.subcategories || [])].sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
      return { ...c, subcategories };
    });
    onUpdateCategories(newCats);
  };

  

  const SortableSubCategoryRow: React.FC<{
    catId: string;
    sub: SubCategory;
    isSorting: boolean;
    onStartEdit: (catId: string, sub: SubCategory) => void;
    onDelete: (catId: string, subId: string, subName: string) => void;
  }> = ({ catId, sub, isSorting, onStartEdit, onDelete }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition
    } = useSortable({ id: `sub:${catId}:${sub.id}`, disabled: !isSorting });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center gap-2 py-1.5 px-2 rounded-md border ${
          isSorting
            ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600'
            : 'bg-white dark:bg-slate-800 border-transparent'
        }`}
      >
        <button
          type="button"
          ref={setActivatorNodeRef}
          className={`p-1 -ml-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ${
            isSorting ? 'cursor-grab active:cursor-grabbing' : 'opacity-40 cursor-default'
          }`}
          title={isSorting ? '拖拽排序' : '开启手动排序后可拖拽'}
          {...(isSorting ? attributes : {})}
          {...(isSorting ? listeners : {})}
          onClick={(e) => e.preventDefault()}
        >
          <GripVertical size={14} />
        </button>

        {editingSubId === sub.id ? (
          <>
            <Icon name={editSubIcon} size={14} />
            <input
              type="text"
              value={editSubName}
              onChange={(e) => setEditSubName(e.target.value)}
              className="flex-1 p-1 px-2 text-sm rounded border border-blue-500 dark:bg-slate-700 dark:text-white outline-none"
              placeholder="二级分类名称"
              autoFocus
            />
            <button
              onClick={() => { setIconSelectorTarget('subEdit'); setIsIconSelectorOpen(true); }}
              className="p-1 text-slate-400 hover:text-blue-500"
              title="选择图标"
            >
              <Palette size={12} />
            </button>
            <button
              onClick={() => saveEditSubCategory(catId)}
              className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-slate-600 rounded"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => setEditingSubId(null)}
              className="p-1 text-slate-400 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <Icon name={sub.icon} size={14} />
            <span className="flex-1 text-sm dark:text-slate-300">{sub.name}</span>
            {onMoveSubCategory && (
              <button
                type="button"
                onClick={() => startMoveSubCategory(catId, sub.id)}
                className="p-1 text-slate-400 hover:text-purple-500"
                title="移动到其他一级分类"
              >
                <ArrowRightLeft size={12} />
              </button>
            )}
            <button
              onClick={() => onStartEdit(catId, sub)}
              className="p-1 text-slate-400 hover:text-blue-500"
              title="编辑"
            >
              <Edit2 size={12} />
            </button>
            <button
              onClick={() => onDelete(catId, sub.id, sub.name)}
              className="p-1 text-slate-400 hover:text-red-500"
              title="删除"
            >
              <Trash2 size={12} />
            </button>
          </>
        )}
      </div>
    );
  };

  const SortableCategoryCard: React.FC<{ cat: Category }> = ({ cat }) => {
    const isSortableEnabled = isCategorySorting && cat.id !== 'common';
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition
    } = useSortable({ id: `cat:${cat.id}`, disabled: !isSortableEnabled });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        id={`cat-card-${cat.id}`}
        className="flex flex-col p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg group gap-2"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            ref={setActivatorNodeRef}
            className={`p-1 -ml-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ${
              isSortableEnabled ? 'cursor-grab active:cursor-grabbing' : 'opacity-40 cursor-default'
            }`}
            title={cat.id === 'common' ? '默认分类固定在顶部' : (isSortableEnabled ? '拖拽排序' : '开启手动排序后可拖拽')}
            {...(isSortableEnabled ? attributes : {})}
            {...(isSortableEnabled ? listeners : {})}
            onClick={(e) => e.preventDefault()}
          >
            <GripVertical size={16} />
          </button>

          <div className="flex items-center gap-2 flex-1">
            {editingId === cat.id && cat.id !== 'common' ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                  <Icon name={editIcon} size={16} />
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 p-1.5 px-2 text-sm rounded border border-blue-500 dark:bg-slate-800 dark:text-white outline-none"
                    placeholder="分类名称"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                    onClick={() => openIconSelector('edit')}
                    title="选择图标"
                  >
                    <Palette size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-slate-400" />
                  <input
                    type="password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="flex-1 p-1.5 px-2 text-sm rounded border border-blue-500 dark:bg-slate-800 dark:text-white outline-none"
                    placeholder="密码（可选）"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Icon name={cat.icon} size={16} />
                <span className="font-medium dark:text-slate-200 truncate">
                  {cat.name}
                  {cat.id === 'common' && (
                    <span className="ml-2 text-xs text-slate-400">(默认分类，不可编辑)</span>
                  )}
                </span>
                {cat.password && <Lock size={12} className="text-slate-400" />}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 self-start mt-1">
            {editingId === cat.id ? (
              <button
                onClick={saveEdit}
                className="text-green-500 hover:bg-green-50 dark:hover:bg-slate-600 p-1.5 rounded bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-600"
              >
                <Check size={16} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => toggleCategoryExpand(cat.id)}
                  className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                  title={expandedCatIds.has(cat.id) ? '收起二级分类' : '展开二级分类'}
                >
                  {expandedCatIds.has(cat.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                <button
                  onClick={() => startAddSubCategory(cat.id)}
                  className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                  title="添加二级分类"
                >
                  <Plus size={14} />
                </button>
                {cat.id !== 'common' && onDemoteCategoryToSubCategory && (
                  <button
                    type="button"
                    onClick={() => startDemoteCategory(cat.id)}
                    className="p-1.5 text-slate-400 hover:text-purple-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                    title="将一级分类移动为其他一级分类的二级分类"
                  >
                    <CornerDownRight size={14} />
                  </button>
                )}
                {cat.id !== 'common' && (
                  <button
                    onClick={() => handleStartEdit(cat)}
                    className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                    title="编辑"
                  >
                    <Edit2 size={14} />
                  </button>
                )}
                {cat.id !== 'common' && (
                  <button
                    onClick={() => handleDeleteClick(cat)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                    title="删除"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                {cat.id === 'common' && (
                  <div className="p-1.5 text-slate-300" title="常用推荐分类不能被删除">
                    <Lock size={14} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {demotingCatId === cat.id && onDemoteCategoryToSubCategory && (
          <div className="flex items-center gap-2 py-2 px-2 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900">
            <span className="text-xs text-purple-700 dark:text-purple-300">移动为二级到：</span>
            <select
              value={demoteTargetCatId}
              onChange={(e) => setDemoteTargetCatId(e.target.value)}
              className="flex-1 p-1.5 text-sm rounded border border-purple-300 dark:border-purple-800 dark:bg-slate-800 dark:text-white outline-none"
            >
              {categories
                .filter(c => c.id !== cat.id)
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            <button
              type="button"
              onClick={confirmDemoteCategory}
              disabled={!demoteTargetCatId}
              className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-slate-700 rounded disabled:opacity-50"
              title="确认移动"
            >
              <Check size={14} />
            </button>
            <button
              type="button"
              onClick={cancelDemoteCategory}
              className="p-1.5 text-slate-400 hover:text-red-500 rounded"
              title="取消"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* 二级分类列表 */}
        {expandedCatIds.has(cat.id) && (
          <div className="ml-8 mt-2 space-y-1 border-l-2 border-slate-200 dark:border-slate-600 pl-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-400">
                二级分类{cat.subcategories && cat.subcategories.length > 0 ? `（${cat.subcategories.length}）` : ''}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleSubCategorySorting(cat.id)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    sortingSubCatId === cat.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                      : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                  title="开启/关闭手动排序（拖拽）"
                >
                  <ArrowUpDown size={12} className="inline-block mr-1" />
                  手动
                </button>
                <button
                  type="button"
                  onClick={() => autoSortSubCategories(cat.id)}
                  disabled={!cat.subcategories || cat.subcategories.length < 2}
                  className="px-2 py-1 text-xs rounded border bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                  title={`自动按名称排序（${categoryNameMap.get(cat.id) || cat.id}）`}
                >
                  <ArrowDownAZ size={12} className="inline-block mr-1" />
                  A-Z
                </button>
              </div>
            </div>

            {cat.subcategories && cat.subcategories.length > 0 && (
              <SortableContext items={cat.subcategories.map(s => `sub:${cat.id}:${s.id}`)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1 mt-1">
                    {movingSub && movingSub.fromCatId === cat.id && (
                      <div className="flex items-center gap-2 py-2 px-2 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900">
                        <span className="text-xs text-purple-700 dark:text-purple-300">
                          移动“{cat.subcategories.find(s => s.id === movingSub.subId)?.name || '未命名'}”到：
                        </span>
                        <select
                          value={moveTargetCatId}
                          onChange={(e) => setMoveTargetCatId(e.target.value)}
                          className="flex-1 p-1.5 text-sm rounded border border-purple-300 dark:border-purple-800 dark:bg-slate-800 dark:text-white outline-none"
                        >
                          {categories
                            .filter(c => c.id !== cat.id)
                            .map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                        <button
                          type="button"
                          onClick={confirmMoveSubCategory}
                          disabled={!moveTargetCatId}
                          className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-slate-700 rounded disabled:opacity-50"
                          title="确认移动"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={cancelMoveSubCategory}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                          title="取消"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    {cat.subcategories.map(sub => (
                      <SortableSubCategoryRow
                        key={sub.id}
                        catId={cat.id}
                        sub={sub}
                        isSorting={sortingSubCatId === cat.id}
                        onStartEdit={startEditSubCategory}
                        onDelete={deleteSubCategory}
                      />
                    ))}
                </div>
              </SortableContext>
            )}

            {addingSubToCatId === cat.id && (
              <div className="flex items-center gap-2 py-1.5 px-2 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                <Icon name={newSubCatIcon} size={14} />
                <input
                  type="text"
                  value={newSubCatName}
                  onChange={(e) => setNewSubCatName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubCategory(cat.id)}
                  className="flex-1 p-1 px-2 text-sm rounded border border-blue-500 dark:bg-slate-700 dark:text-white outline-none"
                  placeholder="新二级分类名称"
                  autoFocus
                />
                <button
                  onClick={() => { setIconSelectorTarget('subNew'); setIsIconSelectorOpen(true); }}
                  className="p-1 text-slate-400 hover:text-blue-500"
                  title="选择图标"
                >
                  <Palette size={12} />
                </button>
                <button
                  onClick={() => handleAddSubCategory(cat.id)}
                  disabled={!newSubCatName.trim()}
                  className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-slate-600 rounded disabled:opacity-50"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setAddingSubToCatId(null)}
                  className="p-1 text-slate-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {(!cat.subcategories || cat.subcategories.length === 0) && addingSubToCatId !== cat.id && (
              <div className="text-xs text-slate-400 py-2 text-center">暂无二级分类</div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  const cancelIconSelector = () => {
    setIsIconSelectorOpen(false);
    setIconSelectorTarget(null);
  };
  
  const cancelAdd = () => {
    setNewCatName('');
    setNewCatPassword('');
    setNewCatIcon('Folder');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold dark:text-white">分类管理</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 dark:text-slate-400" />
          </button>
        </div>

        <div ref={listScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs text-slate-400">一级分类（拖拽可调整顺序）</div>
            <button
              type="button"
              onClick={() => setIsCategorySorting(v => !v)}
              className={`px-2 py-1 text-xs rounded border transition-colors ${
                isCategorySorting
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
              title="开启/关闭手动排序（拖拽）"
            >
              <ArrowUpDown size={12} className="inline-block mr-1" />
              手动
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={categories.map(c => `cat:${c.id}`)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {categories.map(cat => (
                  <SortableCategoryCard key={cat.id} cat={cat} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {demoteConfirm && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="text-base font-semibold text-slate-900 dark:text-slate-100">确认移动</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  确认将一级分类
                  <span className="mx-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200">
                    {categoryNameMap.get(demoteConfirm.fromCatId) || demoteConfirm.fromCatId}
                  </span>
                  移动为
                  <span className="mx-1 px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                    {categoryNameMap.get(demoteConfirm.toCatId) || demoteConfirm.toCatId}
                  </span>
                  下的二级分类吗？
                </div>
              </div>
              <div className="p-4 text-sm text-slate-600 dark:text-slate-400">
                该一级分类下的所有网站会一起移动到目标分类，并归入新建的二级分类。
              </div>
              <div className="p-4 pt-0 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDemoteConfirm(null)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDemoteCategoryToSubCategory?.(demoteConfirm.fromCatId, demoteConfirm.toCatId);
                    setDemoteConfirm(null);
                    cancelDemoteCategory();
                  }}
                  className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  确认移动
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
           <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">添加新分类</label>
           <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2">
               <Icon name={newCatIcon} size={16} />
               <input 
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="分类名称"
                  className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
               />
               <button
                 type="button"
                 className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                 onClick={() => openIconSelector('new')}
                 title="选择图标"
               >
                 <Palette size={16} />
               </button>
             </div>
             <div className="flex gap-2">
                 <div className="flex-1 relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text"
                        value={newCatPassword}
                        onChange={(e) => setNewCatPassword(e.target.value)}
                        placeholder="密码 (可选)"
                        className="w-full pl-8 p-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    />
                 </div>
                 <button 
                    onClick={handleAdd}
                    disabled={!newCatName.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                 >
                   <Plus size={18} />
                 </button>
             </div>
           </div>
          
          {/* 图标选择器弹窗 */}
          {isIconSelectorOpen && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">选择图标</h3>
                  <button
                    type="button"
                    onClick={cancelIconSelector}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <IconSelector 
                    onSelectIcon={(iconName) => {
                      handleIconSelect(iconName);
                      setIsIconSelectorOpen(false);
                      setIconSelectorTarget(null);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* 分类操作密码验证弹窗 */}
          {isAuthModalOpen && pendingAction && (
            <CategoryActionAuthModal
              isOpen={isAuthModalOpen}
              onClose={handleAuthModalClose}
              onVerify={handlePasswordVerification}
              onVerified={handleAuthSuccess}
              actionType={pendingAction.type}
              categoryName={pendingAction.categoryName}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagerModal;
