import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addFolder } from '../../store/folderSlice';
import { removePropagation } from '../../modules/removePropagation';

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFolderModal = ({ isActive, setIsActive }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleCloseModal = () => {
    setIsActive(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    try {
      await dispatch(addFolder(value));
      setIsActive(false);
    } catch (e) {}
  };
  return (
    <>
      <div className="overlay" onClick={() => handleCloseModal()}>
        <div className="modal" onClick={(e) => removePropagation(e)}>
          <div className="modal__contents">
            <h2>Create Your Folder Here</h2>
            <p>Add a new folder to group your projects</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                className="modal__input"
                type="text"
                placeholder=" Folder name"
                ref={inputRef}
                value={value}
                onChange={onChange}
                required
              />
              <div className="modal__buttons">
                <button disabled={disabled} type="submit">
                  Create Folder
                </button>
                {disabled ? (
                  <span style={{ color: 'gray' }}>Cancel</span>
                ) : (
                  <span onClick={() => setIsActive(!isActive)}>Cancel</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFolderModal;
