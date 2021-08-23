exports.isValidCellNumber = function(celNumber){
	
     var cellRegExp = /^(\+\d{1,3} ?)?(\(\d{0,2}\)|\d{0,2}) ?\d{1,6} ?\d{0,6}$/i; 
	 var c = 0;
     var trimedCellNumber = celNumber.trim();
	  
	 if(trimedCellNumber.length==8){
	 
	 var codes= ["78", "79", "76"];
     var SubtrArray = [];
     SubtrArray.push(trimedCellNumber.substring(0,4));
     SubtrArray.push(trimedCellNumber.substring(0,2));
			
	 for (var y=0; y <= 4; y++){
				     if(cellRegExp.test(trimedCellNumber)){
			             for (var x = 0; x <= 1; x++){  
				             if(SubtrArray[x] === codes[y]){
							 return true;
						     
				        }
					}	
			     } 
			}
     }else{
		 if(trimedCellNumber.length > 15){
			  return false;
		 }else{
			 if(cellRegExp.test(trimedCellNumber)){
				 return true;
			 }else {
				 return false;
			 }
		 }
		 return true;
	 }			
			
	return false;
	
}

