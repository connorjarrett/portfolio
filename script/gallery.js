$(document).ready(function() {
    if ($(".gallery-container")) {
        // Scroll
        $.ajax({
            url:"./gallery.json",
            async: false,
            success: function(data){
                var gallery = data

                if (gallery.length % 3 != 0) {
                    gallery = gallery.slice(0, -gallery.length % 3)
                }
                
                function galleryLoop(start, loop) {
                    var interval = 3000

                    if (start) {
                        interval = 0
                    }

                    for (let i=0; i<gallery.length; i+=3) {
                        setTimeout(function(){
                            var i1 = "media/gallery/"+gallery[i]["path"]
                                i2 = "media/gallery/"+gallery[i+1]["path"]
                                i3 = "media/gallery/"+gallery[i+2]["path"]

                            var e1 = document.createElement("img")
                                e2 = document.createElement("img")
                                e3 = document.createElement("img")

                            e1.style.transitionDelay = "0s"
                            e2.style.transitionDelay = "50ms"
                            e3.style.transitionDelay = "100ms"

                            e1.classList = "new"
                            e2.classList = "new"
                            e3.classList = "new"

                            setTimeout(function(){
                                e1.classList = "hold"
                                e2.classList = "hold"
                                e3.classList = "hold"     

                                setTimeout(function(){
                                    if (loop) {
                                        $("section.gallery img:not(.hold)").remove()
                                    }

                                    e1.classList = ""
                                    e2.classList = ""
                                    e3.classList = ""     
                                },550)
                            },interval/2)
                            
                            e1.src = i1
                            e2.src = i2
                            e3.src = i3

                            e1.alt = gallery[i]["description"]
                            e2.alt = gallery[i+1]["description"]
                            e3.alt = gallery[i+2]["description"]

                            e1.dataset.title = gallery[i]["title"] 
                            e2.dataset.title = gallery[i+1]["title"]
                            e3.dataset.title = gallery[i+2]["title"]

                            if (gallery[i]["location"]) {
                                e1.dataset.lat = gallery[i]["location"][0]
                                e1.dataset.long = gallery[i]["location"][1]
                            }

                            if (gallery[i+1]["location"]) {
                                e2.dataset.lat = gallery[i+1]["location"][0]
                                e2.dataset.long = gallery[i+1]["location"][1]
                            }

                            if (gallery[i+2]["location"]) {
                                e3.dataset.lat = gallery[i+2]["location"][0]
                                e3.dataset.long = gallery[i+2]["location"][1]
                            }

                            var container = "section.gallery .gallery-container"

                            $(`${container} .gallery-highlight`)[0].appendChild(e1)
                            $(`${container} #top`)[0].appendChild(e2)
                            $(`${container} #bottom`)[0].appendChild(e3)

                            if (i+3 == gallery.length) {
                                setTimeout(function(){
                                    if (loop) {
                                        galleryLoop(false, true)
                                    }
                                },interval)
                            }
                        },i*(interval/3));
                    }
                }

                galleryLoop(true, gallery.length > 5)
            }
        })

        function galleryNext() {
            var imageName = $(".gallery-enlarge .title")[0].innerHTML

            $.getJSON("gallery.json",function(data){
                for (i=0; i<data.length; i++) {
                    if (data[i]["title"] == imageName) {
                        if (i+1 != data.length) {
                            var newEntry = data[i+1]
                        } else {
                            var newEntry = data[0]
                        }

                        let newImg = document.createElement("img")
                        newImg.src = "media/gallery/"+newEntry["path"]
                        newImg.alt = newEntry["description"],
                        newImg.dataset.title = newEntry["title"]

                        if (newEntry["location"]) {
                            newImg.dataset.lat = newEntry["location"][0]
                            newImg.dataset.long = newEntry["location"][1]
                        }

                        document.body.appendChild(newImg)
                        galleryEnlarge(newImg)
                        newImg.remove()
                    
                    }
                }
            })
        }

        function galleryPrev() {
            var imageName = $(".gallery-enlarge .title")[0].innerHTML

            $.getJSON("gallery.json",function(data){
                for (i=0; i<data.length; i++) {
                    if (data[i]["title"] == imageName) {
                        if (i-1 >= 0) {
                            var newEntry = data[i-1]
                        } else {
                            var newEntry = data[data.length-1]
                        }

                        let newImg = document.createElement("img")
                        newImg.src = "media/gallery/"+newEntry["path"]
                        newImg.alt = newEntry["description"],
                        newImg.dataset.title = newEntry["title"]

                        if (newEntry["location"]) {
                            newImg.dataset.lat = newEntry["location"][0]
                            newImg.dataset.long = newEntry["location"][1]
                        }

                        document.body.appendChild(newImg)
                        galleryEnlarge(newImg)
                        newImg.remove()
                    
                    }
                }
            })
        }

        // Click
        function galleryEnlarge(image) {
            if ($(".gallery-enlarge")) {
                $(".gallery-enlarge").remove()
            }

            var div = document.createElement("div")
            div.classList = "gallery-enlarge"

            var imageContainer = document.createElement("img")
            imageContainer.src = image.src
            imageContainer.alt = image.alt

            var content = document.createElement("div")
            content.classList = "content"

            var imgName = document.createElement("span")
            imgName.classList = "title"
            imgName.innerHTML = image.dataset.title

            var imgAlt = document.createElement("span")
            imgAlt.classList = "description"
            imgAlt.innerHTML = image.alt

            var close = document.createElement("span")
            close.innerHTML = "close"
            close.classList = "icon close"
            close.setAttribute("onclick","$('.gallery-enlarge').remove()")

            var left = document.createElement("span")
            left.innerHTML = "navigate_before"
            left.classList = "arrownav icon left"
            left.onclick = galleryPrev

            var right = document.createElement("span")
            right.innerHTML = "navigate_next"
            right.classList = "arrownav icon right"
            right.onclick = galleryNext

            div.appendChild(close)
            div.appendChild(left)
            div.appendChild(right)

            content.appendChild(imgName)
            content.appendChild(imgAlt)

            div.appendChild(imageContainer)
            div.appendChild(content)
            document.body.appendChild(div)


            if (image.dataset.lat && image.dataset.long) {
                var coords = [parseFloat(image.dataset.lat), parseFloat(image.dataset.long)]

                var mapEl = document.createElement("div")
                mapEl.classList = "map"
                mapEl.id = "map"

                content.appendChild(mapEl)       

                var map = L.map('map').setView(coords, 20);

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            
                var cameraIcon = L.icon({
                    iconUrl: 'media/misc/camera.png',

                    iconSize: [35,35]
                })

                var marker = L.marker(coords, {icon: cameraIcon}).addTo(map);

                L.Control.prototype._refocusOnMap = function _refocusOnMap() {}; 
            }
        }

        $(".gallery-container").click(function(e){
            galleryEnlarge(e.target)
        })
    }
})