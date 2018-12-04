describe('Testing of Printer module', function(){
	beforeEach(module('printerApp'));
	var scope;
	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('printerCtrl', {
			$scope: scope
		});
	}));

	it('there should be more than one printer', function(){
		//expect(scope.printers.length).toBe(3);
	});
});