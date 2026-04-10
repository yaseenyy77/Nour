import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient'; // تأكد إن المسار ده صح بالنسبة لمكان الملف

// ==========================================
// 1. هوكس السلايدرز (الصفحة الرئيسية)
// ==========================================

// جلب بيانات السلايدرز حسب الكاتيجوري
export const useSliders = (category) => {
  return useQuery({
    queryKey: ['sliders', category],
    queryFn: async () => {
      let query = supabase.from('sliders').select('*');
      if (category) {
        query = query.eq('category', category.toLowerCase());
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
};

// إضافة منتج جديد للسلايدر
export const useAddSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSlider) => {
      const { data, error } = await supabase.from('sliders').insert([newSlider]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // تحديث بيانات السلايدرز فوراً
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
  });
};

// حذف منتج من السلايدر
export const useDeleteSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('sliders').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
  });
};

// ==========================================
// 2. هوكس الـ Inventory (صفحة الشوب)
// ==========================================

// جلب كل منتجات الشوب
export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
};

// إضافة منتج جديد للشوب
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct) => {
      const { data, error } = await supabase.from('products').insert([newProduct]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};

// حذف منتج من الشوب (اللي كان عامل لك مشكلة)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      // دي أهم حتة: بتخلي الشوب يمسح القطعة من الشاشة فوراً
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};