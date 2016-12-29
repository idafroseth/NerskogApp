			var pageNumber = 0;
			var itemsOnPage = 10;
			var cardDrawn = 0;
			var row = document.createElement('div');

			function printItems(){
				for(i = pageNumber*itemsOnPage; i<tripsArray.length; i++){
					var trip = tripsArray[i];
					addItemToBody(completeTrips[trip._id]);
				
				}
				addFavoriteEventListener();
				addCardEventListener();



			}


			function getCardImage(trip){
				var image = trip.bilder[0];
				var imageUrl = 'https://c2.staticflickr.com/6/5720/22445884149_cd4e1174dc_o.jpg'; 
				var imgAlt = "Grantre placeholder";

				if(image){
					imgAlt = image.navngiving;
					image = image.img[2];
				 	imageUrl = image.url;

				}
				var cardImg = document.createElement("img");
				cardImg.className = "card-img";
				cardImg.setAttribute('src', imageUrl);
				cardImg.setAttribute('alt', imgAlt);
				cardImg.setAttribute('title', trip.navn);
				return cardImg;

			}

			function getTypeContainer(trip){
				var iconContainer = document.createElement("div");
				iconContainer.setAttribute('align','right');
				iconContainer.className = 'iconContainer';	

				var placedTags = {};
				trip.tags.forEach(function(tag){
					var key = turTyper[tag].icon;
					
					if(key in placedTags){
					}else{
						var icon = document.createElement("img");
						icon.setAttribute('height','48px');
						icon.setAttribute('width','48px');
						icon.setAttribute('alt', tag);
						icon.setAttribute('src',"./icons/"+turTyper[tag].icon);
						iconContainer.appendChild(icon);
						
						placedTags[key] = key;
					}
				});
				return iconContainer;
			}

			function getCardImageOverlay(){
				var cardImgOverlay = document.createElement("div");
				cardImgOverlay.className = "card-img-overlay";
				return cardImgOverlay;
			}

			function getFactContainer(trip){
				var factContainer = document.createElement("div");
				
				var tripFact = document.createElement("div");

				tripFact.className = "trip-fact";
				
				var distanceFact = tripFact.cloneNode("true");
				var difficultFact = tripFact.cloneNode("true"); 
				var timeEstimateFact = tripFact.cloneNode("true");
				factContainer.className = "fact-container";
				distanceFact.innerHTML = '<span class="text-muted">Distanse</span><br/>'+trip.distanse + 'm';
				difficultFact.innerHTML = '<span class="text-muted">Gradering</span><br/>'+trip.gradering;
				timeEstimateFact.innerHTML =  '<span class="text-muted">Tidsbruk</span><br/>'+createTimeEstimateString(trip);
				factContainer.appendChild(distanceFact);
				factContainer.appendChild(difficultFact);
				factContainer.appendChild(timeEstimateFact);
				return factContainer;


			}

			function createTimeEstimateString(trip){
				var timeString = "";
				//Use normal timeestimate if exists, else use min else use max
				if(trip.tidsbruk.normal){
					if(trip.tidsbruk.normal.dager){
						timeString+=trip.tidsbruk.normal.dager + " d ";

					}
					if(trip.tidsbruk.normal.timer){
						timeString+=trip.tidsbruk.normal.timer + " t ";
					}
					if(trip.tidsbruk.normal.minutter){
						timeString+=trip.tidsbruk.normal.minutter + " min ";
					}
				}else if(trip.tidsbruk.min){
					if(trip.tidsbruk.min.dager){
						timeString+=trip.tidsbruk.min.dager + " d ";

					}
					if(trip.tidsbruk.min.timer){
						timeString+=trip.tidsbruk.min.timer + " t ";
					}
					if(trip.tidsbruk.min.minutter){
						timeString+=trip.tidsbruk.min.minutter + " min ";
					}
				}
				else if(trip.tidsbruk.max){
					if(trip.tidsbruk.max.dager){
						timeString+=trip.tidsbruk.max.dager + " d ";

					}
					if(trip.tidsbruk.max.timer){
						timeString+=trip.tidsbruk.max.timer + " t ";
					}
					if(trip.tidsbruk.max.minutter){
						timeString+=trip.tidsbruk.max.minutter + " min ";
					}
				}
				return timeString;

			}

			function getCardTitle(title){
				var cardTitle = document.createElement("h4");
				cardTitle.className = "card-title";
				cardTitle.innerHTML = title;
				return cardTitle;
			}

			function getFavoriteIcon(isFavorite){
				var favoriteIcon = document.createElement("div");
				if(isFavorite){
					favoriteIcon.className = 'favo favorite fa fa-heart fa-2x';
				}
				else{
					favoriteIcon.className = 'favo fa fa-2x fa-heart-o';
				}
				favoriteIcon.style="display:block; padding:10px;";
				favoriteIcon.setAttribute('align','center');

				return favoriteIcon;
				
				
			}

			function getCard(trip){
				var card = document.createElement("div");
				card.setAttribute('id',trip._id);
				card.className ="card";
				return card;
			}


			function getCardBody(trip){
				var cardBody = document.createElement("div");
				cardBody.className = "card-block";

				var iconContainer = getTypeContainer(trip);
				var cardTitle = getCardTitle(trip.navn);
				var factContainer = getFactContainer(trip);
				var favoriteIcon = getFavoriteIcon(trip.favorite);
				
				cardBody.appendChild(iconContainer);
				
				cardBody.appendChild(cardTitle);
				cardBody.appendChild(favoriteIcon);
				cardBody.appendChild(factContainer);
				
				return cardBody;

			}
			function addItemToBody(trip){

				
				var card = getCard(trip);

				var cardImg = getCardImage(trip);
				
				var cardImgOverlay = getCardImageOverlay();

				var cardBody = getCardBody(trip);
				
				var tr = document.getElementById('tripOfLists');

				var colDiv = document.createElement("div");
				colDiv.className = "col-xs-12 col-md-6";

				card.appendChild(cardImg);
				card.appendChild(cardImgOverlay);
				card.appendChild(cardBody);

				colDiv.appendChild(card);
				
				
				
				if(cardDrawn%2 === 0){
					//Every other should have a new row div
					row = document.createElement('div');
					row.className = 'row';
				}

				row.appendChild(colDiv);
				tr.appendChild(row);
				cardDrawn++;
			}

			function addCardEventListener(){
				var cards = document.getElementsByClassName("card");

			
				for (var i = 0; i < cards.length; i++) {
						var onClickCard = function() {
							displayTripModal(this.id);
					
						}

				    cards[i].onclick = onClickCard;
				    
				}
			}
			function addFavoriteEventListener(){
				var favorites = document.getElementsByClassName("favo");
				for (var i = 0; i < favorites.length; i++) {
						var onClickFavorite = function() {
							alert("ClikcedFavoirte");
					
						}
				    favorites[i].onclick = onClickFavorite;
				    
				}

			}

			function displayTripModal(tripId){
				var tripToDisplay = completeTrips[tripId];
				document.getElementById("my-modal-title").innerHTML = tripToDisplay.navn;
				document.getElementById("my-modal-body").innerHTML = tripToDisplay.beskrivelse;
				document.getElementById("my-modal-trip-license").innerHTML = tripToDisplay.navngiving;
				modal.style.display = "block";
			}

			document.onLoad = printItems();