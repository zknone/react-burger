import { FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './refresh-prompt.module.css';

type RefreshPromptProps = {
  message: string;
  buttonLabel?: string;
};

const RefreshPrompt: FC<RefreshPromptProps> = ({
  message,
  buttonLabel = 'Refresh page',
}) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-default mb-4">{message}</p>
      <Button
        type="primary"
        onClick={() => window.location.reload()}
        htmlType={'button'}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default RefreshPrompt;
