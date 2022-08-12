import React, {Component} from "react";
import { variables } from "./Variables.js";

export class Employee extends Component{

    // Django project server may need to be running to see table.
    // If not, remake table following the video exactly.
    constructor(props){
        super(props);

        this.state = {
            departments:[],
            employees:[],
            modalTitle:"",
            EmployeeId:0,
            EmployeeName:"",
            Department:"",
            JoinDate:"",
            PhotoFile:"employee1.png",
            PhotoPath:variables.PHOTO_URL,
        }
    }

    // Refreshes data from departments get api method.
    refreshList(){
        fetch(variables.API_URL+"department")
        .then (response => response.json())
        .then(data => {
            this.setState({departments:data});
        });

        fetch(variables.API_URL+"employee")
        .then (response => response.json())
        .then(data => {
            this.setState({employees:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeEmployeeName = (e) =>{
        this.setState({EmployeeName:e.target.value});
    }

    changeDepartment = (e) =>{
        this.setState({Department:e.target.value});
    }

    changeJoinDate = (e) =>{
        this.setState({JoinDate:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Employee",
            EmployeeId:0,
            EmployeeName:"",
            Department:"",
            JoinDate:"",
            PhotoFile:"employee1.png",
        });
    }

    editClick(emp){
        this.setState({
            modalTitle:"Edit Employee",
            EmployeeId:emp.EmployeeId,
            EmployeeName:emp.EmployeeName,
            Department:emp.Department,
            JoinDate:emp.JoinDate,
            PhotoFile:emp.PhotoFile,
        });
    }

    createClick(){
        fetch(variables.API_URL+"employee", {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"aplication/json"
            },
            body:JSON.stringify({
                EmployeeName:this.state.EmployeeName,
                Department:this.state.Department,
                JoinDate:this.state.JoinDate,
                PhotoFile:this.state.PhotoFile,
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert("Failed");
        })
    }

    updateClick(){
        fetch(variables.API_URL+"employee", {
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"aplication/json"
            },
            body:JSON.stringify({
                EmployeeId:this.state.EmployeeId,
                EmployeeName:this.state.EmployeeName,
                Department:this.state.Department,
                JoinDate:this.state.JoinDate,
                PhotoFile:this.state.PhotoFile,
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert("Failed");
        })
    }

    deleteClick(id){
        if(window.confirm("Are sure you want to delete this entry?")){
            fetch(variables.API_URL+"employee/" + id, {
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"aplication/json"
                }
            })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert("Failed");
            })
        }
    }

    ImageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + "employee/savefile", {
            method:"POST",
            body:formData
        })
        .then(res => res.json())
        .then(data => {
            this.setState({PhotoFile:data});
        })
    }

    render(){
        const {
            departments,
            employees,
            modalTitle,
            EmployeeId,
            EmployeeName,
            Department,
            JoinDate,
            PhotoFile,
            PhotoPath,
        } = this.state;

        return(
<div className="Database">
    {/* Add department button */}
    <button type = "button" className = "btn btn-primary m-2 float-end" data-bs-toggle = "modal" data-bs-target = "#exampleModal" onClick = {() => this.addClick()}>Add Employee</button>

    <table className="table">
    <thead className="thead-dark">
    <tr>
        <th scope="col">EmployeeId</th>
        <th scope="col">EmployeeName</th>
        <th scope="col">Department</th>
        <th scope="col">JoinDate</th>
        <th scope="col">Options</th>
    </tr>
    </thead>
    <tbody>
        {employees.map(emp =>
            <tr key = {emp.EmployeeId}>
                <td>{emp.EmployeeId}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.JoinDate}</td>

                <td>
                    {/* Edit department button */}
                    <button type = "button" className = "btn btn-primary m-2 float-end" data-bs-toggle = "modal" data-bs-target = "#exampleModal" onClick = {() => this.editClick(emp)}>Add Employee</button>

                    <button type="button" className="btn btn-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn btn-dark" onClick = {() => this.deleteClick(emp.EmployeeId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                    </button>
                </td>
            </tr>
            )}
    </tbody>
    </table>

    <div className = "modal fade" id = "exampleModal" tabIndex="-1" aria-hidden = "true">
    <div className = "modal-dialog modal-lg modal-dialog-centered">
    <div className = "modal-content">
        <div className  = "modal-header">
            <h5 className = "modal-title">{modalTitle}</h5>
            <button type = "button" className = "btnclose" data-bs-dismss = "modal" aria-label = "Close"></button>
        </div>
        
        <div className = "modal-body">
            <div className = "d-flex flex-row bd-highlight mb-3">
                <div className = "p-2 w-50 bd-highlight">
                    <div className = "input-group mb-3">
                        <span className = "input-group-text">EmployeeName</span>
                        <input type = "text" className = "form-control" value = {EmployeeName} onChange = {this.changeEmployeeName}></input>
                    </div>

                    <div className = "input-group mb-3">
                        <span className = "input-group-text">Department</span>
                        <select className = "form-select" value = {Department} onChange = {this.changeDepartment}> {departments.map(dep => <option key = {dep.DepartmentId}>
                            {dep.DepartmentName}
                            </option>)}
                        </select>
                    </div>

                    <div className = "input-group mb-3">
                         <span className = "input-group-text">JoinDate</span>
                        <input type = "date" className = "form-control" value = {JoinDate} onChange = {this.changeJoinDate}></input>
                    </div>
                </div>

            <div className = "p-2 w-50 bd-highlight">
                <img width = "250px" height = "250px" src = {PhotoPath+PhotoFile}/>
                <input className = "m-2" type = "file" onChange = {this.ImageUpload}/>
            </div>



            </div>
            {EmployeeId == 0?
            <button type = "button"
            className = "btn btn-primary float-start" onClick = {() => this.createClick()}>Create</button>
            :null}

            {EmployeeId != 0?
            <button type = "button"
            className = "btn btn-primary float-start" onClick = {() => this.updateClick()}>Update</button>
            :null}
        </div>

    </div>
    </div>
    </div>

</div>
        )
    }
}
