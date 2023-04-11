import {ReviewFormProps} from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import {Input} from '../Input/Input';
import {Rating} from '../Rating/Rating';
import {Textarea} from '../Textarea/Textarea';
import {Button} from '../Button/Button';
import {useForm, Controller} from 'react-hook-form';
import {IReviewForm, IReviewSentResponse} from './ReviewForm.interface';
import axios, {toFormData} from 'axios';
import {API} from '../../helpers/api';
import {useState} from 'react';


export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)}
           {...props}
      >
        <Input {...register('name',
          {required: {value: true, message: 'Заполните имя'}})}
               error={errors.name}
               placeholder={'Имя'}/>
        <Input {...register('title',
          {required: {value: true, message: 'Заполните заголовок'}})}
               error={errors.title}
               className={styles.title}
               placeholder={'Заголовок отзыва'}/>
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller control={control}
                      render={({field}) => (
                        <Rating ref={field.ref}
                                isEditable
                                rating={field.value}
                                setRating={field.onChange}
                                error={errors.rating}

                        />
                      )}
                      name={'rating'}
                      rules={{required: {value: true, message: 'Укажите рейтинг'}}}
          />
        </div>
        <Textarea
          className={styles.description}
          {...register('description',
            {required: {value: true, message: 'Заполните описание'}})}
          placeholder={'Текст отзыва'}
          error={errors.description}
        />
        <div className={styles.sumbit}>
          <Button appearance={'primary'}>
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      {isSuccess &&
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>
            Спасибо, ваш отзыв будет опубликован после проверки.
          </div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
        </div>
      }
      {error &&
        <div className={cn(styles.error, styles.panel)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon className={styles.close} onClick={() => setError(undefined)}/>
        </div>
      }
    </form>
  );
};
