const awardData = [
            {
                id: 1,
                name: "Nursing - Miss Wellspring",
                description: "Nominees in the Department of Nursing",
                type: "health",
                nominees: [
                    { id: 101, name: "Fejiro Omasibro", votes:3397, image: "img/fejiro.jpg" },
                    { id: 102, name: "Ediagbonya Racheal", votes:247, image: "img/rachael.jpg" },
                    { id: 104, name: "Nwite Chioma Promise", votes: 1180, image: "img/Nwite.jpg" },
                    { id: 105, name: "Kimberly Eke", votes: 3630, image: "img/kimberly.jpg" },
                    { id: 106, name: "Nwachukwu Chioma", votes: 207.5, image: "img/chioma.jpg" },
                    { id: 107, name: "Uzomezie Sylvia", votes: 728, image: "img/sylvia.jpg" }
                    
                ]
            },
            {
                id: 2,
                name: "Computing - Mr Wellspring",
                description: "Nominees in the Department of Computing",
                type: "computing",
                nominees: [
                    { id: 201, name: "Imasuen Walter", votes: 42, image: "img/walter.jpg" },
                    { id: 202, name: "Godswill Enajewhe", votes: 0, image: "img/Godswill.jpg" },
                    { id: 203, name: "Ogundun Moyinjah", votes: 196, image: "img/classic.jpg" },
                    { id: 204, name: "Akpeninor Favour", votes: 0, image: "img/favour.jpg" },
                    { id: 205, name: "Ehikwe Destinty", votes: 1161, image: "img/freddy.jpg" }
                            
                ]
                
            },
            {
                id: 3,
                name: "Business Administration - Mr Wellspring",
                description: "Nominees in the Department of Business Administration",
                type: "management",
                nominees: [
                    { id: 301, name: "Glory Benjamin Uche", votes: 66, image: "img/glory.jpg" },
                    { id: 302, name: "Emmanuel Chigozie Alozie", votes: 20, image: "img/alozie.jpg" }
                    

                ]
            },
            {
                id: 4,
                name: "Public Administration - Mr Wellspring",
                description: "Nominees in the Department of Public Administration",
                type: "management",
                nominees: [
                    { id: 401, name: "Osawese Praise", votes: 0, image: "img/praise.jpg" },
                    { id: 402, name: "Williams Godson", votes: 991, image: "img/williams.jpeg" }
                    
                ]
            },
            {
                id: 5,
                name: "Medical Laboratory - Miss Wellspring",
                description: "Nominees in the Department of Medical Laboratory",
                type: "health",
                nominees: [
                    { id: 501, name: "Roy Alexa", votes: 56, image: "img/Alexa.jpg" },
                    { id: 502, name: "Elogho Deborah", votes: 0, image: "img/deborah.jpg" }
                 
                ]
            },
            {
                id: 6,
                name: "Medical Laboratory - Mr Wellspring",
                description: "Nominees in the Department of Medical Laboratory",
                type: "health",
                nominees: [
                    { id: 601, name: "Nwafor Chisom", votes: 45, image: "img/chisom.jpg" }
                    
                ]
            },

            {
                id: 7,
                name: "Nursing - Mr Wellspring",
                description: "Nominees in the Department of Nursing",
                type: "health",
                nominees: [
                    { id: 701, name: "Amengialue Michael", votes: 1187, image: "img/prosper.jpg" },
                    { id: 702, name: "Osaretin Igbinosa", votes: 5, image: "img/desmond.jpg" },
                    { id: 703, name: "Giaus", votes: 4018, image: "img/Gaius.jpg" }
                    
            
                ]
            },

            {
                id: 8,
                name: "Computing - Miss Wellspring",
                description: "Nominees in the Department of Computing",
                type: "computing",
                nominees: [
                    { id: 701, name: "Ndah Treasure", votes: 14, image: "img/treasure.jpg" }
                   
                            
                ]
            },

            {
                id: 9,
                name: "Public Health - Miss Wellspring",
                description: "Nominees in the Department of Public Health",
                type: "health",
                nominees: [
                    { id: 701, name: "Otakpemehi Tehilah", votes: 95, image: "img/Tehilah.jpg" }
                    
                ]
            },

            {
                id: 10,
                name: "Public Administration - Miss Wellspring",
                description: "Nominees in the Department of Public Administration",
                type: "management",
                nominees: [
                    { id: 1001, name: "Osasere Sylvia", votes: 131, image: "img/smile.jpg" }
                    
                ]
            },

            {
                id: 11,
                name: "Accounting - Miss Wellspring",
                description: "Nominees in the Department of Accounting",
                type: "management",
                nominees: [
                    { id: 1101, name: "Osahon Favour", votes: 95, image: "img/osahon.jpg" },
                    { id: 1102, name: "Emmanuel Blessing", votes: 46, image: "img/blessing.jpeg" }
                    
                ]
            },

           
        ];

        // Variables to store charts and current filter
        const charts = {};
        let currentFilter = 'all';
        let searchTerm = '';

        // Initialize the page and set up event listeners
        document.addEventListener('DOMContentLoaded', function() {
            updateLastUpdated();
            renderCategories(awardData);
            
            // Set up search functionality
            document.getElementById('search-input').addEventListener('input', function(e) {
                searchTerm = e.target.value.toLowerCase();
                filterCategories();
            });
            
            // Set up category filters
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.getAttribute('data-filter');
                    filterCategories();
                });
            });
            
            // Set up refresh button
            document.getElementById('refresh-btn').addEventListener('click', function() {
                document.getElementById('loading').classList.remove('hidden');
                setTimeout(() => {
                    refreshData();
                    document.getElementById('loading').classList.add('hidden');
                }, 1000);
            });

            // Auto refresh every 30 seconds
            setInterval(refreshData, 30000);
   
        });

        // Update timestamp for last data refresh
        function updateLastUpdated() {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('update-time').textContent = formattedTime;
        }

        // Render all category cards
        function renderCategories(categories) {
            const container = document.getElementById('categories-container');
            container.innerHTML = '';
            document.getElementById('loading').classList.add('hidden');
            
            if (categories.length === 0) {
                document.getElementById('no-results').classList.remove('hidden');
                return;
            } else {
                document.getElementById('no-results').classList.add('hidden');
            }
            
            categories.forEach(category => {
                const card = createCategoryCard(category);
                container.appendChild(card);
            });
        }

        // Create individual category card with chart and nominees list
        function createCategoryCard(category) {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.setAttribute('data-type', category.type);
            
            // Sort nominees by vote count (descending)
            category.nominees.sort((a, b) => b.votes - a.votes);
            const leadingNominee = category.nominees[0];
            
            // Create card header
            const header = document.createElement('div');
            header.className = 'category-header';
            header.innerHTML = `
                <h2 class="category-title">${category.name}</h2>
                <div class="category-desc">${category.description}</div>
            `;
            card.appendChild(header);
            
            // Create chart container
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            chartContainer.innerHTML = `<canvas id="chart-${category.id}"></canvas>`;
            card.appendChild(chartContainer);
            
            // Create nominees list
            const nomineesList = document.createElement('ul');
            nomineesList.className = 'nominees-list';
            
            category.nominees.forEach(nominee => {
                const isLeader = nominee.id === leadingNominee.id;
                const listItem = document.createElement('li');
                listItem.className = `nominee-item ${isLeader ? 'leader' : ''}`;
                listItem.innerHTML = `
                    <img src="${nominee.image}" alt="${nominee.name}" class="nominee-img">
                    <div class="nominee-info">
                        <div class="nominee-name">${nominee.name}</div>
                        <div class="vote-count">${nominee.votes} votes</div>
                    </div>
                `;
                nomineesList.appendChild(listItem);
            });
            
            card.appendChild(nomineesList);
            
            // Initialize chart after DOM is fully loaded
            setTimeout(() => {
                initChart(category);
            }, 0);
            
            return card;
        }

        // Initialize Chart.js chart for category
        function initChart(category) {
            const ctx = document.getElementById(`chart-${category.id}`).getContext('2d');
            
            // Prepare chart data
            const labels = category.nominees.map(n => n.name);
            const data = category.nominees.map(n => n.votes);
            const colors = generateColors(category.nominees.length);
            
            // Create chart
            charts[category.id] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Votes',
                        data: data,
                        backgroundColor: colors,
                        borderColor: colors.map(c => c.replace('0.7', '1')),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.raw} votes`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Generate different colors for chart bars
        function generateColors(count) {
            const baseColors = [
                'rgba(58, 134, 255, 0.7)',   // Blue
                'rgba(255, 0, 110, 0.7)',    // Pink
                'rgba(138, 201, 38, 0.7)',   // Green
                'rgba(255, 184, 0, 0.7)',    // Yellow
                'rgba(131, 56, 236, 0.7)',   // Purple
                'rgba(255, 122, 69, 0.7)'    // Orange
            ];
            
            const colors = [];
            for (let i = 0; i < count; i++) {
                colors.push(baseColors[i % baseColors.length]);
            }
            
            return colors;
        }

        // Filter categories based on search term and category type
        function filterCategories() {
            const filteredData = awardData.filter(category => {
                // Check if category matches the filter
                const matchesFilter = currentFilter === 'all' || category.type === currentFilter;
                
                // Check if category or nominees match the search term
                const matchesSearch = searchTerm === '' || 
                    category.name.toLowerCase().includes(searchTerm) ||
                    category.description.toLowerCase().includes(searchTerm) ||
                    category.nominees.some(nominee => nominee.name.toLowerCase().includes(searchTerm));
                
                return matchesFilter && matchesSearch;
            });
            
            renderCategories(filteredData);
        }

       // Refresh data without changing vote counts
function refreshData() {
    // Only refresh the display with existing data
    filterCategories();
    
    // If you still want to update the charts to ensure they're displayed correctly
    awardData.forEach(category => {
        if (charts[category.id]) {
            charts[category.id].update();
        }
    });
    
    // If you're keeping the time update (or replace with your own code if you've changed this)
    if (typeof updateLastUpdated === 'function') {
        updateLastUpdated();
    }
}
