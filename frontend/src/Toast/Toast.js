
import toast from 'react-hot-toast';

export const showtoast = (title) => {
    toast.success(title);
};



export const promisToast = () => {
    toast.promise(
        saveSettings(settings),
        {
            loading: 'Saving...',
            success: 'Settings saved',
            error: 'Could not save',
        }
    );
}