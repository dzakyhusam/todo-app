import React from 'react';
import moreicon from './assets/moreicon.png';
import menuicon from './assets/menu.ico';
import dottedimage from './assets/dottedimage.png';
import './App.css';
import './responsive.css';
import ProjectItem from './components/projectItem';
import TodoItem from './components/todoItem';

const dateNow = "2020-09-02";
const getProjects = 'https://demo8226278.mockable.io/getProjects';
const getTodo = 'https://demo8226278.mockable.io/getTodo';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectActive: 1,
      projectActiveName: "",
      projectList: [],
      projectHasNext: false,
      projectNumber: 0,
      todoList: [],
      sliderActive: true
    }
    this.sliderClick = this.sliderClick.bind(this);
  }

  componentDidMount() {
    fetch(getProjects)
      .then(response => response.json())
      .then(data => this.setState({ 
        projectList: data.projects, 
        projectActiveName: data.projects[0].name,
        projectNumber: data.count,
        projectHasNext: data.has_next
      }));
    
    fetch(getTodo)
      .then(response => response.json())
      .then(data => this.setState({ todoList: data.to_do }));
  }

  projectClick(projectSelected, projectSelectedName) {
    this.setState({ 
      projectActive: projectSelected,
      projectActiveName: projectSelectedName,
      sliderActive: true 
    });
  }

  sliderClick() {
    this.setState({ sliderActive: !this.state.sliderActive });
  }

  render() {
    return (
      <div className="Todo-App">
        
        <div className="left-side">
          <button className="nav-slider" onClick={ this.sliderClick }>
            <img src={ menuicon } alt=""></img>
          </button>
          <div className="project">
            <h1>Hi Samantha</h1>
            <p>Welcome back to the workspace. We missed You!</p>
            <div className="searchbox">
              <i className="fa fa-search"></i>
              <form>
                <input placeholder="Search Task or Project.."></input>
              </form>
            </div>
            <h2>Projects <span>({ this.state.projectNumber })</span></h2>
            <div className="project-list">
              { this.state.projectList.map(project =>
                  <ProjectItem 
                    project={ project }
                    projectSelected={ this.state.projectActive }
                    onClick={ () => { this.projectClick(project.project_id, project.name) } }
                  />
              )}
              <div className="project-sample">
                <div className="box-outer box-false">
                  <div className="box">
                    <div className="notif-false"></div>
                    <h4 className="project-left">{ this.state.projectNumber - 5 }+</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={ this.state.sliderActive ? "right-side" : "right-slider-deactive"}>
          <div className={ this.state.sliderActive ? "to-do" : "todo-slider-deactive"}>
            <button className="back-button" onClick={ this.sliderClick }>
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <div className="project-wrapper">
              <div className="project-header">
                <div className="project-title">
                  <h2>{ this.state.projectActiveName }</h2>
                  <p>Lorep ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmad tempor incididunt</p>
                </div>
                <div className="project-people">
                  <div className="project-people-container">
                    <button className="add-people">+</button>
                    <div className="people-sample"></div>
                    <div className="people-sample"></div>
                    <div className="people-sample"></div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row today-title-container">
                  <div className="col-9 today-title">
                    <h3>Today</h3>
                  </div>
                  <div className="col-3 today-more">
                    <div className="more-button">
                      <img src={ moreicon } alt=""></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="today-container">
                { this.state.todoList.filter(todo => todo.project_id === this.state.projectActive && todo.date === dateNow).map(todo =>
                  <TodoItem
                    todo={ todo }
                  />
                )}
              </div>
              <div className="container-fluid">
                <div className="row today-title-container">
                  <div className="col-9 today-title">
                    <h3>Upcoming</h3>
                  </div>
                  <div className="col-3 today-more">
                    <div className="more-button">
                      <img src={ moreicon } alt=""></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="upcoming-container">
                { this.state.todoList.filter(todo => todo.project_id === this.state.projectActive && todo.date !== dateNow).map(todo =>
                  <TodoItem
                    todo={ todo }
                  />
                )}
              </div>
            </div>
            <button className={ this.state.sliderActive? "add-todo" : "add-todo add-none" }>+</button>
          </div>
        </div>

        <img className="dotted-top" src={ dottedimage } alt=""></img>

      </div>
    )
  }
}

export default TodoApp;
