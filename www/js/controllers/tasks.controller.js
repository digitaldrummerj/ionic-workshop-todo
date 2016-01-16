angular
		.module('starter')
		.controller('TasksController', TasksController);

TasksController.$inject = ['$scope', '$ionicModal', 'ProjectService'];

function TasksController($scope, $ionicModal, ProjectService) {
  $ionicModal.fromTemplateUrl(
    'templates/new-task.html',
    function (modal) {
      $scope.taskModal = modal;
    },
    {
      scope: $scope
    }
    );

  $scope.showTaskModal = function () {
    $scope.taskModal.show();
  }

  $scope.closeTaskModal = function () {
    $scope.taskModal.hide();
  }

  $scope.saveNewTask = function (task) {

    if (!$scope.activeProject || !task || !task.title) {
      return;
    }

    var newTask = ProjectService.addTask(task);
    $scope.activeProject.tasks.push(newTask);
    ProjectService.save($scope.projects);
    $scope.closeTaskModal();

    task.title = "";
  }

  $scope.deleteTask = function (task, $index) {
    $scope.activeProject.tasks.splice($index, 1);
    ProjectService.save($scope.projects);
  }

  $scope.completeTask = function (task, $index) {
    if ($scope.activeProject.tasks[$index].completed) {
      $scope.activeProject.tasks[$index].completed = false;
    } else {
      $scope.activeProject.tasks[$index].completed = true;
    }
    
    ProjectService.save($scope.projects);
  }

}