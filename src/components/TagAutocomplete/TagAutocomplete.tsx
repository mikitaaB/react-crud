import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { TaskFormValues } from '../TaskForm/TaskForm';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useCreateTagMutation, useGetTagsQuery } from '../../services/taskService';
import type { Tag } from '../../types/task';

interface TagAutocompleteProps {
    control: Control<TaskFormValues>;
    error?: FieldErrors<TaskFormValues>['tags'];
}

const TagAutocomplete = ({ control, error }: TagAutocompleteProps) => {
    const { data: tags = [] } = useGetTagsQuery();
    const [createTag] = useCreateTagMutation();

    const handleCreateTag = (name: string) =>
        createTag({ name }).unwrap();

    const extractIds = (arr: (string | Tag)[]) =>
        arr.filter((v): v is Tag => typeof v !== 'string').map(v => v.id);

    const handleChange = async (
        newValue: (string | Tag)[],
        onChange: (value: string[]) => void
    ) => {
        const last = newValue.at(-1);

        if (typeof last === 'string') {
            const created = await handleCreateTag(last);
            onChange([...extractIds(newValue), created.id]);
            return;
        }

        onChange(extractIds(newValue));
    };

    return (
        <Controller
            name="tags"
            control={control}
            render={({ field }) => (
                <Autocomplete<Tag, true, false, true>
                    multiple
                    freeSolo
                    options={tags}
                    getOptionLabel={(option) =>
                        typeof option === 'string' ? option : option.name
                    }
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    value={tags.filter(t => field.value?.includes(t.id))}
                    onChange={(_, newValue) => handleChange(newValue, field.onChange)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Теги"
                            error={!!error}
                            helperText={error ? 'At least one tag is required' : ''}
                        />
                    )}
                />
            )}
        />
    );
};

export default TagAutocomplete;
