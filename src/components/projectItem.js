import React from 'react';

class ProjectItem extends React.Component {
  render() {
    return (
			<div className="project-sample">
				<div onClick={this.props.onClick} className={ this.props.project.project_id === this.props.projectSelected ? "box-outer box-true" : "box-outer box-false"}>
					<div className="box">
						<div className={ this.props.project.has_notification ? "notif-true" : "notif-false" }></div>
					</div>
				</div>
				<h4 className="project-name">{ this.props.project.name }</h4>
			</div>
    )
  }
}

export default ProjectItem;