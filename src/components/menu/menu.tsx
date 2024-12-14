import { Button, Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './menu.module.css';
const Menu = () => {
    return(
        <div className={`${styles.container} pt-4 pb-4`}>
            <div className={styles.menuWrapper}>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Button extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`} style={{color: 'white'}}type="secondary" htmlType='button'><BurgerIcon type='primary'/>Constructor</Button>
                    </li>
                    <li className={styles.menuItem}>
                        <Button extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`} type="secondary" htmlType='button'><ListIcon type='secondary'/> Order feed</Button>
                    </li>
                </ul>
                <Logo/>
                <Button extraClass={`${styles.menuButton} pl-5 pr-5 pt-4 pb-4`} type="secondary" htmlType='button'><ProfileIcon type='secondary'/>My Account</Button>
            </div>
        </div>);
}

export {Menu};