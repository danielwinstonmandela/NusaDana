
// Dashboard page JS
// Chart.js logic and dashboard-specific code

// --- State and Data ---
let projects = [
	{
		id: 1,
		name: 'Perbaikan Jalan Desa Utama',
		category: 'jalan',
		description: 'Perbaikan jalan sepanjang 2km dengan aspal hotmix',
		budget: 800000000,
		priority: 'tinggi',
		status: 'sedang-berjalan',
		progress: 75,
		startDate: '2024-01-15',
		endDate: '2024-06-15',
		createdAt: '2024-01-10'
	},
	{
		id: 2,
		name: 'Pembangunan Jembatan Sungai Brantas',
		category: 'jembatan',
		description: 'Pembangunan jembatan beton sepanjang 50 meter',
		budget: 600000000,
		priority: 'tinggi',
		status: 'menunggu-dana',
		progress: 0,
		startDate: '2024-07-01',
		endDate: '2024-12-31',
		createdAt: '2024-02-15'
	},
	{
		id: 3,
		name: 'Renovasi Balai Desa',
		category: 'fasilitas',
		description: 'Renovasi balai desa untuk meningkatkan pelayanan publik',
		budget: 300000000,
		priority: 'sedang',
		status: 'perencanaan',
		progress: 15,
		startDate: '2024-08-01',
		endDate: '2024-11-30',
		createdAt: '2024-03-01'
	},
	{
		id: 4,
		name: 'Pembangunan MCK Umum',
		category: 'sanitasi',
		description: 'Pembangunan 5 unit MCK umum untuk warga',
		budget: 200000000,
		priority: 'sedang',
		status: 'sedang-berjalan',
		progress: 45,
		startDate: '2024-03-01',
		endDate: '2024-08-31',
		createdAt: '2024-02-20'
	},
	{
		id: 5,
		name: 'Pelatihan UMKM Desa',
		category: 'pemberdayaan',
		description: 'Program pelatihan dan pemberdayaan UMKM untuk warga',
		budget: 150000000,
		priority: 'rendah',
		status: 'selesai',
		progress: 100,
		startDate: '2024-01-01',
		endDate: '2024-03-31',
		createdAt: '2024-01-01'
	}
];

// --- Chart Rendering ---
function getStatusText(status) {
	const texts = {
		'perencanaan': 'Perencanaan',
		'menunggu-dana': 'Menunggu Dana',
		'sedang-berjalan': 'Sedang Berjalan',
		'selesai': 'Selesai',
		'ditunda': 'Ditunda'
	};
	return texts[status] || status;
}

function renderDashboardCharts() {
	// Bar Chart: Project Progress
	if (window.dashboardBarChart) window.dashboardBarChart.destroy();
	const ctxBar = document.getElementById('dashboard-bar-chart').getContext('2d');
	window.dashboardBarChart = new Chart(ctxBar, {
		type: 'bar',
		data: {
			labels: projects.map(p => p.name),
			datasets: [{
				label: 'Progress (%)',
				data: projects.map(p => p.progress),
				backgroundColor: '#23272f',
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: { display: false },
				title: { display: true, text: 'Progress Proyek' }
			},
			scales: {
				y: { beginAtZero: true, max: 100 }
			}
		}
	});
	// Pie Chart: Project Status
	if (window.dashboardPieChart) window.dashboardPieChart.destroy();
	const ctxPie = document.getElementById('dashboard-pie-chart').getContext('2d');
	const statusCounts = projects.reduce((acc, p) => {
		acc[p.status] = (acc[p.status] || 0) + 1;
		return acc;
	}, {});
	window.dashboardPieChart = new Chart(ctxPie, {
		type: 'pie',
		data: {
			labels: Object.keys(statusCounts).map(getStatusText),
			datasets: [{
				data: Object.values(statusCounts),
				backgroundColor: ['#23272f', '#444950', '#8e8e93', '#f59e42', '#10b981']
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: { position: 'bottom' },
				title: { display: true, text: 'Distribusi Status Proyek' }
			}
		}
	});
	// Line Chart: Budget Usage
	if (window.dashboardLineChart) window.dashboardLineChart.destroy();
	const ctxLine = document.getElementById('dashboard-line-chart').getContext('2d');
	window.dashboardLineChart = new Chart(ctxLine, {
		type: 'line',
		data: {
			labels: projects.map(p => p.name),
			datasets: [{
				label: 'Anggaran (Rp)',
				data: projects.map(p => p.budget),
				borderColor: '#8e8e93',
				backgroundColor: 'rgba(142,142,147,0.1)',
				fill: true,
				tension: 0.4
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: { display: false },
				title: { display: true, text: 'Anggaran Proyek' }
			},
			scales: {
				y: { beginAtZero: true }
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', function() {
	renderDashboardCharts();
});
