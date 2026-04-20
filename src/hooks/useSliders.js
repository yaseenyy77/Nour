import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient'; 

// --- هوكس السلايدرز ---
export const useSliders = (brand) => {
  return useQuery({
    queryKey: ['sliders', brand],
    queryFn: async () => {
      let query = supabase.from('sliders').select('*');
      
      // التعديل: الفلترة بالبراند (المصنع) بدلاً من الكاتيجوري
      if (brand) {
        query = query.eq('manufacturer', brand);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
};

export const useAddSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSlider) => {
      const { data, error } = await supabase.from('sliders').insert([newSlider]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sliders'] }),
  });
};

// --- هوكس المخزون ---
export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct) => {
      const { data, error } = await supabase.from('products').insert([newProduct]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventory'] }),
  });
};