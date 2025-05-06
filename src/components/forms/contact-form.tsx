'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  telegram: z.string().min(2, { message: 'Укажите ваш ник в Telegram' }),
  email: z.string().email({ message: 'Введите корректный email' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onClose?: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      telegram: '',
      email: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки. Пожалуйста, попробуйте позже');
      }

      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        if (onClose) onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitSuccess(false);
      setErrorMessage(
        error instanceof Error ? error.message : 'Произошла ошибка при отправке'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='z-2 w-full flex flex-col flex-grow'>
      <h2 className='text-center font-raleway text-2xl font-bold uppercase text-white md:mb-9'>
        Укажите свои данные
      </h2>

      {submitSuccess === true && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
          Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      {submitSuccess === false && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {errorMessage ||
            'Ошибка отправки формы. Пожалуйста, попробуйте еще раз.'}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-[18px] mt-9 md:mt-0 flex-grow flex flex-col'>
        <div>
          <input
            type='text'
            className='h-[46px] w-full rounded-[14px] px-5 py-[15px] font-raleway text-sm font-normal bg-white text-background shadow-[0px_10px_78px_1px_rgba(121,121,121,0.12)] focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Имя'
            {...register('name')}
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-400'>{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            className='h-[46px] w-full rounded-[14px] px-5 py-[15px] font-raleway text-sm font-normal bg-white text-background shadow-[0px_10px_78px_1px_rgba(121,121,121,0.12)] focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Ник Telegram'
            {...register('telegram')}
          />
          {errors.telegram && (
            <p className='mt-1 text-sm text-red-400'>
              {errors.telegram.message}
            </p>
          )}
        </div>

        <div>
          <div className='relative'>
            <input
              type='email'
              className='h-[46px] w-full rounded-[14px] px-5 py-[15px] font-raleway text-sm font-normal bg-white text-background shadow-[0px_10px_78px_1px_rgba(121,121,121,0.12)] focus:outline-none focus:ring-2 focus:ring-purple-500'
              placeholder='Email*'
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className='mt-1 text-sm text-red-400'>{errors.email.message}</p>
          )}
        </div>

        <div className='mt-auto pt-10'>
          <div className='w-full rounded-[12px] p-[2px] bg-gr-primary'>
            <Button type='submit' variant='submit' isLoading={isSubmitting}>
              Отправить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
