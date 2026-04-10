import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient'; // تم التصحيح: نطلع خطوة واحدة لـ src

// 1. Hook لجلب بيانات السلايدرز حسب القسم
export const useSliders = (category) => {
  return useQuery({
    queryKey: ['sliders', category],
    queryFn: async () => {
      let query = supabase.from('sliders').select('*');
      if (category) {
        query = query.eq('category', category.toLowerCase());
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// 2. Hook لإضافة منتج جديد
export const useAddSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSlider) => {
      const { data, error } = await supabase.from('sliders').insert([newSlider]);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
    },
  });
};