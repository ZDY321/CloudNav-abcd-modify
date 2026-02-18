import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown, Trash2, Edit2, Plus, Check, Lock, Unlock, Palette, ChevronDown, ChevronRight } from 'lucide-react';
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
  onVerifyPassword?: (password: string) => Promise<boolean>;
}

const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onUpdateCategories,
  onDeleteCategory,
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
  
  // 分类操作验证相关状态
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'edit' | 'delete';
    categoryId: string;
    categoryName: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newCats = [...categories];
    if (direction === 'up' && index > 0) {
      [newCats[index], newCats[index - 1]] = [newCats[index - 1], newCats[index]];
    } else if (direction === 'down' && index < newCats.length - 1) {
      [newCats[index], newCats[index + 1]] = [newCats[index + 1], newCats[index]];
    }
    onUpdateCategories(newCats);
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
  const startEditSubCategory = (sub: SubCategory) => {
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

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {categories.map((cat, index) => (
            <div key={cat.id} className="flex flex-col p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg group gap-2">
              <div className="flex items-center gap-2">
                  {/* Order Controls */}
                  <div className="flex flex-col gap-1 mr-2">
                    <button 
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-0.5 text-slate-400 hover:text-blue-500 disabled:opacity-30"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === categories.length - 1}
                      className="p-0.5 text-slate-400 hover:text-blue-500 disabled:opacity-30"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {editingId === cat.id && cat.id !== 'common' ? (
                      <div className="flex flex-col gap-2">
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
                        {cat.password && (
                          <Lock size={12} className="text-slate-400" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 self-start mt-1">
                    {editingId === cat.id ? (
                       <button onClick={saveEdit} className="text-green-500 hover:bg-green-50 dark:hover:bg-slate-600 p-1.5 rounded bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-600"><Check size={16}/></button>
                    ) : (
                       <>
                        {/* 展开/折叠二级分类按钮 */}
                        <button
                          onClick={() => toggleCategoryExpand(cat.id)}
                          className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                          title={expandedCatIds.has(cat.id) ? "收起二级分类" : "展开二级分类"}
                        >
                          {expandedCatIds.has(cat.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        {/* 添加二级分类按钮 */}
                        <button
                          onClick={() => startAddSubCategory(cat.id)}
                          className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                          title="添加二级分类"
                        >
                          <Plus size={14} />
                        </button>
                        {cat.id !== 'common' && (
                          <button onClick={() => handleStartEdit(cat)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
                              <Edit2 size={14} />
                          </button>
                        )}
                        {/* 只有非"常用推荐"分类才显示删除按钮 */}
                        {cat.id !== 'common' && (
                            <button 
                            onClick={() => handleDeleteClick(cat)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                            >
                            <Trash2 size={14} />
                            </button>
                        )}
                        {/* "常用推荐"分类显示锁定图标 */}
                        {cat.id === 'common' && (
                            <div className="p-1.5 text-slate-300" title="常用推荐分类不能被删除">
                                <Lock size={14} />
                            </div>
                        )}
                       </>
                    )}
                  </div>
              </div>
              
              {/* 二级分类列表 */}
              {expandedCatIds.has(cat.id) && (
                <div className="ml-8 mt-2 space-y-1 border-l-2 border-slate-200 dark:border-slate-600 pl-3">
                  {cat.subcategories && cat.subcategories.map(sub => (
                    <div key={sub.id} className="flex items-center gap-2 py-1.5 px-2 bg-white dark:bg-slate-800 rounded-md">
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
                            onClick={() => saveEditSubCategory(cat.id)}
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
                          <button
                            onClick={() => startEditSubCategory(sub)}
                            className="p-1 text-slate-400 hover:text-blue-500"
                            title="编辑"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => deleteSubCategory(cat.id, sub.id, sub.name)}
                            className="p-1 text-slate-400 hover:text-red-500"
                            title="删除"
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {/* 添加新二级分类输入框 */}
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
                    <div className="text-xs text-slate-400 py-2 text-center">
                      暂无二级分类
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

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