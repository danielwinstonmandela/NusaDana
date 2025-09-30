
// Reports page JS
// Report generation and upload logic

function showNotification(message, type = 'info') {
	const notification = document.getElementById('notifications');
	if (!notification) return;
	const colors = {
		success: 'bg-green-100 border-green-500 text-green-700',
		error: 'bg-red-100 border-red-500 text-red-700',
		warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
		info: 'bg-blue-100 border-blue-500 text-blue-700'
	};
	notification.className = `${colors[type] || colors.info} border-l-4 p-4 mx-4 mt-4 rounded shadow-sm`;
	notification.innerHTML = `
		<div class="flex items-center">
			<div class="flex-shrink-0">
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
				</svg>
			</div>
			<div class="ml-3">
				<p class="text-sm">${message}</p>
			</div>
		</div>
	`;
	setTimeout(() => {
		notification.style.display = 'none';
	}, 5000);
}

function generateReport() {
	showNotification('Laporan sedang di-generate... Silakan tunggu beberapa saat.', 'info');
	setTimeout(() => {
		showNotification('Laporan berhasil di-generate dan tersedia untuk diunduh.', 'success');
	}, 2000);
}
