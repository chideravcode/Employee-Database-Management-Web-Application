import React, {Component} from "react";
import { variables } from "./Variables.js";

export class Department extends Component{

    // Django project server may need to be running to see table.
    // If not, remake table following the video exactly.
    constructor(props){
        super(props);

        this.state = {
            departments:[],
            modalTitle:"",
            DepartmentName:"",
            DepartmentId:0,
            DepartmentIdFilter:"",
            DepartmentNameFilter:"",
            departmentsWithoutFilter:[],
        }
    }

    FilterFn(){
        var DepartmentIdFilter = this.state.DepartmentIdFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter;

        var filteredData = this.state.departmentsWithoutFilter.filter(
            function(el){
                return el.DepartmentName.toString().toLowerCase().includes(DepartmentIdFilter.toString().trim().toLowerCase())
                &&
                el.DepartmentNameFilter.toString().toLowerCase().includes(DepartmentIdFilter.toString().trim().toLowerCase())
            }
        );
        
        this.setState({departments:filteredData});
    }

    sortResult(prop, asc){
        var sortedData = this.state.departmentsWithoutFilter.sort(function(a, b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            } else {
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });
        this.setState({departments:sortedData});
    }

    changeDepartmentIdFilter = (e) =>{
        this.state.DepartmentIdFilter = e.target.value;
        this.FilterFn();
    }

    changeDepartmentNameFilter = (e) =>{
        this.state.DepartmentNameFilter = e.target.value;
        this.FilterFn();
    }

    // Refreshes data from departments get api method.
    refreshList(){
        fetch(variables.API_URL+"department")
        .then (response => response.json())
        .then(data => {
            this.setState({departments:data, departmentsWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeDepartmentName = (e) =>{
        this.setState({DepartmentName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Department",
            DepartmentId:0,
            DepartmentName:"",
        });
    }

    editClick(dep){
        this.setState({
            modalTitle:"Edit Department",
            DepartmentId:dep.DepartmentId,
            DepartmentName:dep.DepartmentName,
        });
    }

    createClick(){
        fetch(variables.API_URL+"department", {
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"aplication/json"
            },
            body:JSON.stringify({
                DepartmentName:this.state.DepartmentName
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
        fetch(variables.API_URL+"department", {
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"aplication/json"
            },
            body:JSON.stringify({
                DepartmentId:this.state.DepartmentId,
                DepartmentName:this.state.DepartmentName,
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
            fetch(variables.API_URL+"department/" + id, {
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

    render(){
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName,
        } = this.state;

        return(
<div className="Database">
    {/* Add department button */}
    <button type = "button" className = "btn btn-primary m-2 float-end" data-bs-toggle = "modal" data-bs-target = "#exampleModal" onClick = {() => this.addClick()}>Add Department</button>

    <table className="table">
    <thead className="thead-dark">
    <tr>
        <div className = "d-flex flex-row">
        <th scope="col"><input className = "form-control m-2" onChange = {this.changeDepartmentIdFilter} placeholder = "Filter"></input>DepartmentId</th>
        <button type = "button" className = "btn btn-light" onclick = {() => this.sortResult("DepartmentId", true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
            </svg>
        </button>

        <button type = "button" className = "btn btn-light" onclick = {() => this.sortResult("DepartmentId", false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
            </svg>
        </button>
        </div>

        <div className = "d-flex flex-row">
        <th scope="col"><input className = "form-control m-2" onChange = {this.changeDepartmentNameFilter} placeholder = "Filter"></input>DepartmentName</th>
        <button type = "button" className = "btn btn-light" onclick = {() => this.sortResult("DepartmentName", true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
            </svg>
        </button>

        <button type = "button" className = "btn btn-light" onclick = {() => this.sortResult("DepartmentName", false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
            </svg>
        </button>
        </div>


        <th scope="col">Options</th>
    </tr>
    </thead>
    <tbody>
        {departments.map(dep =>
            <tr key = {dep.DepartmentId}>
                <td>{dep.DepartmentId}</td>
                <td>{dep.DepartmentName}</td>

                <td>
                    {/* Edit department button */}
                    <button type = "button" className = "btn btn-primary m-2 float-end" data-bs-toggle = "modal" data-bs-target = "#exampleModal" onClick = {() => this.editClick(dep)}>Add Department</button>

                    <button type="button" className="btn btn-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn btn-dark" onClick = {() => this.deleteClick(dep.DepartmentId)}>
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
            <div className = "input-group mb-3">
                <span className = "input-group-text">DepartmentName</span>
                <input type = "text" className = "form-control" value = {DepartmentName} onChange = {this.changeDepartmentName}></input>
            </div>

            {DepartmentId == 0?
            <button type = "button"
            className = "btn btn-primary float-start" onClick = {() => this.createClick()}>Create</button>
            :null}

            {DepartmentId != 0?
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
