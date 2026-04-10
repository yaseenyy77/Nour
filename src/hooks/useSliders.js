import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient'; 

// 1. هوك جلب بيانات السلايدرز (الرئيسية)
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

// 2. هوك جلب بيانات الـ Inventory (الشوب) - اللي فيه المشكلة
export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'], // ده المفتاح اللي هنستخدمه للتحديث
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

// 3. هوك حذف منتج من الشوب - تم تعديل الـ Success لتحديث الجدول
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      // السطر ده هو اللي هيخلي "yaseen 3mk" يختفي فوراً من الجدول
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};

// 4. هوك إضافة منتج للشوب
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