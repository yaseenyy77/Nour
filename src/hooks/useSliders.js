import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

// --- هوكس السلايدرز (عشان السيستم يفضل شغال) ---
export const useSliders = (category) => {
  return useQuery({
    queryKey: ['sliders', category],
    queryFn: async () => {
      let query = supabase.from('sliders').select('*');
      if (category) query = query.eq('category', category.toLowerCase());
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

// --- هوكس الشوب (Inventory) - ده السيستم اللي إنت عايزه ---
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
      // ده السطر اللي بيخلي المنتج يختفي فوراً من قدامك
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