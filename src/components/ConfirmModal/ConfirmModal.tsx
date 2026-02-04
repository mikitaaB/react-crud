import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmModalProps {
    open: boolean;
    confirmBtnText: string;
    confirmMessage: string;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal = ({
    open,
    confirmBtnText,
    confirmMessage,
    onClose,
    onConfirm
}: ConfirmModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{"Подтверждение"}</DialogTitle>
            <DialogContent>
                <p>{confirmMessage}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{"Отмена"}</Button>
                <Button onClick={onConfirm} color="error">{confirmBtnText}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;
