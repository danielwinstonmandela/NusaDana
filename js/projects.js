
// Projects page JS
// Project management logic

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

function formatCurrency(amount) {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0
	}).format(amount);
}

function getStatusColor(status) {
	const colors = {
		'perencanaan': 'bg-gray-100 text-gray-800',
		'menunggu-dana': 'bg-yellow-100 text-yellow-800',
		'sedang-berjalan': 'bg-blue-100 text-blue-800',
		'selesai': 'bg-green-100 text-green-800',
		'ditunda': 'bg-red-100 text-red-800'
	};
	return colors[status] || 'bg-gray-100 text-gray-800';
}
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
function getPriorityColor(priority) {
	const colors = {
		'tinggi': 'bg-red-100 text-red-800',
		'sedang': 'bg-yellow-100 text-yellow-800',
		'rendah': 'bg-green-100 text-green-800'
	};
	return colors[priority] || 'bg-gray-100 text-gray-800';
}

function renderProjects() {
	const projectsList = document.getElementById('projects-list');
	if (!projectsList) return;
	projectsList.innerHTML = '';
	projects.forEach(project => {
		const projectCard = document.createElement('div');
		projectCard.className = 'bg-white rounded-lg shadow-sm p-6';
		projectCard.innerHTML = `
			<div class="flex justify-between items-start mb-4">
				<div class="flex-1">
					<h3 class="text-lg font-semibold text-gray-900 mb-2">${project.name}</h3>
					<p class="text-gray-600 text-sm mb-3">${project.description}</p>
				</div>
				<div class="flex flex-col space-y-2 ml-4">
					<span class="px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}">
						${getStatusText(project.status)}
					</span>
					<span class="px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}">
						${project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
					</span>
				</div>
			</div>
			<div class="mb-4">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm text-gray-600">Progress</span>
					<span class="text-sm font-medium text-gray-900">${project.progress}%</span>
				</div>
				<div class="w-full bg-gray-200 rounded-full h-2">
					<div class="bg-primary h-2 rounded-full transition-all duration-300" style="width: ${project.progress}%"></div>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4 mb-4">
				<div>
					<p class="text-xs text-gray-500">Anggaran</p>
					<p class="text-sm font-medium text-gray-900">${formatCurrency(project.budget)}</p>
				</div>
				<div>
					<p class="text-xs text-gray-500">Target Selesai</p>
					<p class="text-sm font-medium text-gray-900">${new Date(project.endDate).toLocaleDateString('id-ID')}</p>
				</div>
			</div>
			<div class="flex space-x-2">
				<button onclick="viewProjectDetails(${project.id})" class="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
					Detail
				</button>
				<button onclick="editProject(${project.id})" class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors">
					Edit
				</button>
			</div>
		`;
		projectsList.appendChild(projectCard);
	});
}

function showModal(modalName) {
	document.getElementById(modalName + '-modal').classList.remove('hidden');
}
function hideModal(modalName) {
	document.getElementById(modalName + '-modal').classList.add('hidden');
}

function addProject() {
	const form = document.getElementById('add-project-form');
	const newProject = {
		id: projects.length + 1,
		name: document.getElementById('project-name').value,
		category: document.getElementById('project-category').value,
		description: document.getElementById('project-description').value,
		budget: parseInt(document.getElementById('project-budget').value),
		priority: document.getElementById('project-priority').value,
		status: 'perencanaan',
		progress: 0,
		startDate: document.getElementById('project-start-date').value,
		endDate: document.getElementById('project-end-date').value,
		createdAt: new Date().toISOString().split('T')[0]
	};
	projects.push(newProject);
	renderProjects();
	hideModal('add-project');
	form.reset();
	// Show notification if available
	if (typeof showNotification === 'function') showNotification('Proyek berhasil ditambahkan!', 'success');
}

function viewProjectDetails(projectId) {
	const project = projects.find(p => p.id === projectId);
	if (project) {
		alert(`Detail Proyek: ${project.name}\n\nDeskripsi: ${project.description}\nStatus: ${getStatusText(project.status)}\nAnggaran: ${formatCurrency(project.budget)}\nProgress: ${project.progress}%`);
	}
}

function editProject(projectId) {
	alert(`Fitur edit proyek untuk ID ${projectId} akan tersedia di versi selanjutnya.`);
}

document.addEventListener('DOMContentLoaded', function() {
	renderProjects();
	const form = document.getElementById('add-project-form');
	if (form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			addProject();
		});
	}
	document.querySelectorAll('.modal').forEach(modal => {
		modal.addEventListener('click', function(e) {
			if (e.target === modal) {
				modal.classList.add('hidden');
			}
		});
	});
});
