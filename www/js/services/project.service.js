angular
		.module('starter')
		.factory('ProjectService', ProjectService);

ProjectService.$inject = ['$localstorage'];

function ProjectService($localstorage) {
  return {
    "getProjects": getProjects,
    "addProject": addProject,
    "addTask": addTask,
    "save": save
  };
  
  function save(projects) {
    $localstorage.set('projects', angular.toJson(projects));  
  }
  
  function addTask(task) {
    return {
      "title": task.title,
      "completed": false
    };
  }

  function addProject(project) {
    return {
      "title": project.title,
      "tasks": [
        {
          "title": "first tasks"
        }
      ]
    };
  }

  function getProjects() {
    var projects = $localstorage.get('projects');
    if (projects) {
      return angular.fromJson(projects);
    }
    
    return [];
    // return [
    //   {
    //     "title": "Project 1",
    //     "tasks": [
    //       {
    //         "title": "Task 1",
    //         "completed": false
    //       },
    //       {
    //         "title": "Task 2",
    //         "completed": true
    //       }
    //     ]
    //   },
    //   {
    //     "title": "Project 2",
    //     "tasks": []
    //   }
    // ];
  }
}