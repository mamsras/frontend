import axios from 'axios';



//cette classe gère les requêtes API

class TaskDataService{
    getAllTask(token, filters = {}) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get('http://localhost:8000/tasks/', { params: filters });
    }
    getTask(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`http://localhost:8000/tasks/${id}`);
    }
    createTask(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post("http://localhost:8000/tasks/", data);
    }
    updateTask(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://localhost:8000/tasks/${id}`, data);
    }
    deleteTask(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`http://localhost:8000/tasks/${id}`);
    }
    startTask(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://localhost:8000/tasks/start/${id}`);
    }
    completeTask(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://localhost:8000/tasks/complete/${id}`);
    }
    login(data){
        return axios.post("http://localhost:8000/login/", data);
    }
    signup(data){
        return axios.post("http://localhost:8000/signup/", data);
    }
}
export default new TaskDataService();