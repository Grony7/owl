import {FooterProps} from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div className={styles.permission}>
        OwlTop © 2020 - 2023 Все права защищены
      </div>
      <ul className={styles.list}>
        <li className={styles.item}><a className={styles.link} href='#'>Пользовательское соглашение</a></li>
        <li className={styles.item}><a className={styles.link} href='#'>Политика конфиденциальности</a></li>
      </ul>
    </footer>
  );
};
