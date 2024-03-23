function calculatePagination(currentPage, totalPages) {
  let startPage, endPage;
  const MAX_PAGES_DISPLAYED = 5; // Máximo de páginas a serem exibidas
  if (totalPages <= MAX_PAGES_DISPLAYED) {
    // Se o número total de páginas for menor ou igual a 5, exiba todas as páginas
    startPage = 1;
    endPage = totalPages;
  } else {
    // Determine o número de páginas a serem exibidas antes e depois da página atual
    const halfPagesDisplayed = Math.floor(MAX_PAGES_DISPLAYED / 2);
    if (currentPage <= halfPagesDisplayed) {
      startPage = 1;
      endPage = MAX_PAGES_DISPLAYED;
    } else if (currentPage + halfPagesDisplayed >= totalPages) {
      startPage = totalPages - MAX_PAGES_DISPLAYED + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPagesDisplayed;
      endPage = currentPage + halfPagesDisplayed;
    }
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
}

export default calculatePagination;
