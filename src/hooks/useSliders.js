import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient'; 

export const useSliders = (category) => {
  return useQuery({
    queryKey: ['sliders', category],
    queryFn: async () => {
      let query = supabase.from('sliders').select('*');
      // الفلترة باستخدام عمود category المتاح في جدولك
      if (category) {
        query = query.eq('category', category); 
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