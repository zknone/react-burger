import { Button, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './menu.module.css';
import AccountIcon from '../../assets/account-icon'
import OrdersIcon from '../../assets/orders-icon';
import CheesburgerIcon from '../../assets/cheesburger-icon';

const Menu = () => {
    return(
        <div className={styles.container}>
            <div className={styles.menuWrapper}>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Button extraClass={styles.menuButton} type="secondary" htmlType='button'><CheesburgerIcon/>Constructor</Button>
                    </li>
                    <li className={styles.menuItem}>
                        <Button extraClass={styles.menuButton} type="secondary" htmlType='button'><OrdersIcon/> Order feed</Button>
                    </li>
                </ul>
                <Logo/>
                <Button extraClass={styles.menuButton} type="secondary" htmlType='button'><AccountIcon/>My Account</Button>
            </div>
        </div>);
}

export {Menu};