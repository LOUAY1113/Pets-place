import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service';
import { ProductService, Product } from '../../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  /* =========================
        CATEGORIES
  ========================== */
  categories: Category[] = [];
  @ViewChild('categoryGrid') categoryGrid!: ElementRef;

  autoScrollInterval: any = null;
  restartTimer: any = null;

  /* =========================
      FEATURED PRODUCTS
  ========================== */
  featuredProducts: Product[] = [];
  displayedProducts: Product[] = []; // cartes affichées
  currentPage = 0;
  cardsPerPage = 8;

  public backendUrl = environment.apiUrl;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Get categories
    this.categoryService.getCategories().subscribe(
      (data) => (this.categories = data),
      (error) => console.error('Erreur categories:', error)
    );

    // Get featured products
    this.productService.getProducts().subscribe(
      (data) => {
        this.featuredProducts = data;
        this.updateDisplayedProducts();
      },
      (err) => console.error(err)
    );
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  /* =========================
       IMAGE UTILITY
  ========================== */
  getImage(imageFile: string): string {
    if (!imageFile) return "assets/default.png";
    return `${this.backendUrl}/uploads/${imageFile}`;
  }

  /* =========================
       CATEGORIES SLIDER
  ========================== */
  scrollLeft() {
    this.pauseAutoScrollTemporarily();
    this.categoryGrid.nativeElement.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight() {
    this.pauseAutoScrollTemporarily();
    this.categoryGrid.nativeElement.scrollBy({ left: 250, behavior: 'smooth' });
  }

  startAutoScroll() {
    if (this.autoScrollInterval) return;
    this.autoScrollInterval = setInterval(() => {
      const grid = this.categoryGrid.nativeElement;
      grid.scrollBy({ left: 1.5 });
      if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 5) {
        grid.scrollTo({ left: 0 });
      }
    }, 15);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  pauseAutoScrollTemporarily() {
    this.stopAutoScroll();
    if (this.restartTimer) clearTimeout(this.restartTimer);
    this.restartTimer = setTimeout(() => this.startAutoScroll(), 2000);
  }

  /* =========================
      FEATURED PRODUCTS PAGINATION
  ========================== */
  updateDisplayedProducts() {
    const start = this.currentPage * this.cardsPerPage;
    this.displayedProducts = this.featuredProducts.slice(start, start + this.cardsPerPage);
  }

  nextProduct() {
    const maxPage = Math.floor((this.featuredProducts.length - 1) / this.cardsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  prevProduct() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }
}
