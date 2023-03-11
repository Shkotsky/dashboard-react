import React, { useReducer, useRef, useState } from 'react';
import { toggleModal } from '../../store/projectModalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addProject } from '../../store/projectSlice';
import { removePropagation } from '../../modules/removePropagation';

enum ProjectActionKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  SET_NAME = 'SET_NAME',
  SET_PRICE = 'SET_PRICE',
  SET_SOURCELANG = 'SET_SOURCELANG',
  SET_TARGETLANG = 'SET_TARGETLANG',
  SET_RANGE = 'SET_RANGE',
}

interface ProjectAction {
  type: ProjectActionKind;
  payload: any;
}

interface ProjectState {
  name: string;
  price: number;
  sourceLang: string;
  targetLang: string[];
  range: string;
}

function projectReducer(state: ProjectState, action: ProjectAction) {
  const { type, payload } = action;
  switch (type) {
    case ProjectActionKind.SET_NAME:
      return {
        ...state,
        name: payload,
      };
    case ProjectActionKind.SET_PRICE:
      return {
        ...state,
        price: payload,
      };
    case ProjectActionKind.SET_SOURCELANG:
      return {
        ...state,
        sourceLang: payload,
      };
    case ProjectActionKind.SET_TARGETLANG:
      return {
        ...state,
        targetLang: !state.targetLang.includes(payload)
          ? [...state.targetLang, payload]
          : state.targetLang.filter((lang) => lang !== payload),
      };
    case ProjectActionKind.SET_RANGE:
      return {
        ...state,
        range: payload,
      };
    default:
      return state;
  }
}

const CreateProjectModal = () => {
  const rangeRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [state, dispatchReducer] = useReducer(projectReducer, {
    name: '',
    price: 0,
    sourceLang: '',
    targetLang: [],
    range: '0.0',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);

    await dispatch(
      addProject({
        name: state.name,
        price: {
          total_euro: state.price,
        },
        source_language: state.sourceLang,
        target_languages: state.targetLang,
        progress: {
          percent: Number(state.range),
        },
      })
    );
    dispatch(toggleModal());
  };

  return (
    <div className="overlay" onClick={() => dispatch(toggleModal())}>
      <div className="modal" onClick={(e) => removePropagation(e)}>
        <div className="modal__contents">
          <h2>Create Your Project Here</h2>
          <p>Add new project for translation</p>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) =>
                dispatchReducer({
                  type: ProjectActionKind.SET_NAME,
                  payload: e.target.value,
                })
              }
              className="modal__input"
              type="text"
              placeholder=" Project name"
              value={state.name}
              required
            />
            <div>
              <input
                type="number"
                placeholder="Price"
                min="1"
                max="100000"
                value={state.price}
                onChange={(e) =>
                  dispatchReducer({
                    type: ProjectActionKind.SET_PRICE,
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div className="language-wrapper">
              <div>
                <p>Source Language:</p>
                <div>
                  <select
                    onChange={(e) =>
                      dispatchReducer({
                        type: ProjectActionKind.SET_SOURCELANG,
                        payload: e.target.value,
                      })
                    }
                  >
                    <option>EN</option>
                    <option>MK</option>
                    <option>GE</option>
                    <option>FR</option>
                  </select>
                </div>
              </div>
              <div>
                <p>Target Languages:</p>
                <div className="checkbox-wrapper">
                  <label>EN</label>
                  <input
                    type="checkbox"
                    value="EN"
                    onChange={(e) =>
                      dispatchReducer({
                        type: ProjectActionKind.SET_TARGETLANG,
                        payload: e.target.value,
                      })
                    }
                  />
                  <label>MK</label>
                  <input
                    type="checkbox"
                    value="MK"
                    onChange={(e) =>
                      dispatchReducer({
                        type: ProjectActionKind.SET_TARGETLANG,
                        payload: e.target.value,
                      })
                    }
                  />
                  <label>GE</label>
                  <input
                    type="checkbox"
                    value="GE"
                    onChange={(e) =>
                      dispatchReducer({
                        type: ProjectActionKind.SET_TARGETLANG,
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <p>Translation progress: {state.range} </p>
              <input
                type="range"
                className="form-range"
                ref={rangeRef}
                value={state.range}
                min="0"
                max="1"
                step="0.1"
                onChange={(e) =>
                  dispatchReducer({
                    type: ProjectActionKind.SET_RANGE,
                    payload: e.target.value,
                  })
                }
              />
            </div>

            <div className="modal__buttons">
              <button type="submit" disabled={disabled}>
                Create Project
              </button>
              <span onClick={() => dispatch(toggleModal())}>Cancel</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
