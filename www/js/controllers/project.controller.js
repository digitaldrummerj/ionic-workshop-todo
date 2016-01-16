angular
		.module('starter')
		.controller('ProjectController', ProjectController);

ProjectController.$inject = ['$scope', '$state', 'ProjectService', '$ionicModal', '$ionicSideMenuDelegate', '$ionicHistory'];

function ProjectController($scope, $state, ProjectService, $ionicModal, $ionicSideMenuDelegate, $ionicHistory) {
  $scope.projects = ProjectService.getProjects();

  $scope.selectProject = function (project) {
    $scope.activeProject = project;
  }

  $ionicModal.fromTemplateUrl('templates/new-project.html', function (modal) {
    $scope.projectModal = modal;
  }, {
      scope: $scope
    });

  $scope.showProjectModal = function () {
    $scope.projectModal.show();
  }

  $scope.closeProjectModal = function () {
    $scope.projectModal.hide();
  }

  $scope.saveNewProject = function (project) {
    var projectTitle = project.title;
    if (projectTitle) {
      var newProject = ProjectService.addProject(project);
      $scope.projects.push(newProject);
      ProjectService.save($scope.projects);
      $scope.selectProject(newProject);
      $ionicSideMenuDelegate.toggleLeft();
      $scope.closeProjectModal();
      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $state.go('app.tasks');

    }

    project.title = "";
  }

  $scope.deleteProject = function (project, $index) {
    if (project === $scope.activeProject) {
      $scope.activeProject = {};
    }
    $scope.projects.splice($index, 1);
    ProjectService.save($scope.projects);
  }
}