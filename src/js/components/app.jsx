import { useState, useEffect } from "react";

function App() {
    // Se inicia cargando directamente desde el localStorage
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [input, setInput] = useState("");

    // Guardar tareas en localStorage
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Crear tareas al pulsar Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
        setTasks([...tasks, input.trim()]);
        setInput("");
        }
    };

    //Borra tareas
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Contenedor de la App
    return (
        <div className="container">
        <h1>Agenda de Trabajo</h1>
        <input
            type="text"
            placeholder="Escribe una tarea y presiona Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
        />

        {tasks.length === 0 ? (
            <p className="empty-message animate__animated animate__fadeIn">
            No hay tareas pendientes
            </p>
        ) : (
            <ul>
            {tasks.map((task, index) => (
                <li key={index} className="animate__animated animate__fadeInUp">
                <span>{task}</span>
                <button onClick={() => deleteTask(index)}>
                    <i className="fas fa-trash"></i>
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default App;