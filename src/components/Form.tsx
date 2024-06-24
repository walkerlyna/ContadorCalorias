import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/categories"
import { useState, useEffect, ChangeEvent, FormEvent, Dispatch } from "react"
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const parsedValue = id === 'calories' || id === 'category' ? Number(value) : value;

    setActivity(prevActivity => ({
      ...prevActivity,
      [id]: parsedValue
    }));
  };

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'save-activity', payload: { newActivity: activity } })
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria: </label>
        <select
          id="category"
          value={activity.category}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg"
        >

          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}

        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad: </label>
        <input
          id="name"
          value={activity.name}
          onChange={handleChange}
          type="text"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          className="border border-state-300 p-2 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorías: </label>
        <input
          id="calories"
          value={activity.calories}
          onChange={handleChange}
          type="numbers"
          placeholder="Calorías. ej. 200 o 400"
          className="border border-state-300 p-2 rounded-lg"
        />
      </div>

      <input
        type="submit"
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
      />
    </form>
  )
}
