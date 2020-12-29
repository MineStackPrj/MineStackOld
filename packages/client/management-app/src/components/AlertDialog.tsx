import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/***
 * ダイアログを利用する際に必要なProps
 */
export interface IDialogProps {
  /**
   * ダイアログを表示するかどうか
   * 親コンポーネントのuseStateで管理されている想定
   */
  isOpen: boolean;

  /**
   * Closeイベント
   */
  onClose: () => void;
  /**
   * ダイアログのタイトル
   */
  title: string;

  /**
   * ダイアログのメッセージ
   */
  message: string;

  /**
   * OKボタンが押された際に実行されるコールバック
   */
  onOk: () => void;
}

export function AlertDialogOkCancel(props: IDialogProps): JSX.Element {
  const { isOpen, title, message, onOk, onClose } = props;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={onOk} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
