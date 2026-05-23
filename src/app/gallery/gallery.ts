import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const FALLBACK_IMG =
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'><rect width='150' height='150' fill='%23f1f5f9'/><line x1='50' y1='50' x2='100' y2='100' stroke='%2394a3b8' stroke-width='4'/><line x1='100' y1='50' x2='50' y2='100' stroke='%2394a3b8' stroke-width='4'/><rect x='35' y='35' width='80' height='80' rx='6' fill='none' stroke='%2394a3b8' stroke-width='4'/><text x='50%25' y='75%25' dominant-baseline='middle' text-anchor='middle' font-size='11' fill='%2394a3b8'>No Image</text></svg>`;

@Component({
  selector: 'app-gallery',
  imports: [NgFor, NgIf],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements OnInit {
  allPhotos: Photo[] = [];
  displayedPhotos: Photo[] = [];
  isLoading = true;
  error: string | null = null;

  selectedPhoto: Photo | null = null;

  currentPage = 1;
  photosPerPage = 30;

  selectedAlbum: number | null = null;
  albums: number[] = [];

  readonly fallbackImg = FALLBACK_IMG;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=150')
      .then(res => res.json())
      .then((data: Photo[]) => {
        this.allPhotos = data;
        this.albums = [...new Set(data.map((p: Photo) => p.albumId))].slice(0, 10);
        this.applyFilter(false);
        this.isLoading = false;
        this.cdr.detectChanges();
      })
      .catch((err: Error) => {
        this.error = 'Failed to load photos: ' + err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  applyFilter(detect = true): void {
    const filtered = this.selectedAlbum
      ? this.allPhotos.filter(p => p.albumId === this.selectedAlbum)
      : this.allPhotos;
    const start = (this.currentPage - 1) * this.photosPerPage;
    this.displayedPhotos = filtered.slice(start, start + this.photosPerPage);
    if (detect) this.cdr.detectChanges();
  }

  get totalPages(): number {
    const total = this.selectedAlbum
      ? this.allPhotos.filter(p => p.albumId === this.selectedAlbum).length
      : this.allPhotos.length;
    return Math.ceil(total / this.photosPerPage);
  }

  filterByAlbum(albumId: number | null): void {
    this.selectedAlbum = albumId;
    this.currentPage = 1;
    this.applyFilter();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.fallbackImg) {
      img.src = this.fallbackImg;
    }
  }

  openLightbox(photo: Photo): void {
    this.selectedPhoto = photo;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeLightbox(): void {
    this.selectedPhoto = null;
    document.body.style.overflow = '';
    this.cdr.detectChanges();
  }

  prevPhoto(): void {
    if (!this.selectedPhoto) return;
    const idx = this.displayedPhotos.findIndex(p => p.id === this.selectedPhoto!.id);
    if (idx > 0) { this.selectedPhoto = this.displayedPhotos[idx - 1]; this.cdr.detectChanges(); }
  }

  nextPhoto(): void {
    if (!this.selectedPhoto) return;
    const idx = this.displayedPhotos.findIndex(p => p.id === this.selectedPhoto!.id);
    if (idx < this.displayedPhotos.length - 1) { this.selectedPhoto = this.displayedPhotos[idx + 1]; this.cdr.detectChanges(); }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}
