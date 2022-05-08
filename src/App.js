import React from 'react';
import axios from "axios";
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      users:[],
      id:0,
      name:'',
      email:'',
      password:''
    }

  }
  componentDidMount(){
    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      this.setState({
        users:res.data,
        id:0,
        name:'',
        email:'',
        password:''
      })
    })
  }
  submit(event,id){
    event.preventDefault();
    if(id === 0){
      axios.post("http://localhost:8080/api/",{
        name:this.state.name,
        email:this.state.email,
        password:this.state.password
      })
      .then((res)=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:this.state.id,
        name:this.state.name,
        email:this.state.email,
        password:this.state.password
      }).then(()=>{
        this.componentDidMount();
      })

    }

  }
  delete(id){
    axios.delete(`http://localhost:8080/api/${id}`)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(id){
    axios.get(`http://localhost:8080/api/${id}`)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        id:res.data.id,
        name:res.data.name,
        email:res.data.email,
        password:res.data.password
      })
    })
  }
  render(){
  return (
    <div className="container" >
    
    <div className="row">
    <div className="col s6">
        <form onSubmit={(e)=>this.submit(e,this.state.id)}>
        <div class="input-field col s12">
          <i class="material-icons prefix">person</i>
          <input onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name} type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Name</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">email</i>
          <input onChange={(e)=>this.setState({email:e.target.value})} value={this.state.email} type="email" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Email</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">vpn_key</i>
          <input onChange={(e)=>this.setState({password:e.target.value})} value={this.state.password} type="password" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Password</label>
        </div>
        <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
        </button>
        </form>
      </div>
      <div className="col s6">
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.users.map(user=>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                <button onClick={(e)=>this.edit(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons">edit</i>
                </button>
                </td>
                <td>
                <button onClick={(e)=>this.delete(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons">delete</i>
                </button>
                </td>
              </tr>
              )
          }
          
        </tbody>
      </table>
      </div>
    
    </div>
    </div>
  );
  }
}

export default App;
