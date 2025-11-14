import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service';
import { ProductService, Product } from '../../services/product.service';

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
  featuredProducts: Product[] = []; // maintenant dynamique depuis backend

  @ViewChild('productsGrid') productsGrid!: ElementRef;


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    // Get categories from backend
    this.categoryService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error('Erreur categories:', error)
    );

    // Get products from backend
    this.productService.getProducts().subscribe(
      (data) => this.featuredProducts = data,
      (error) => console.error('Erreur produits:', error)
    );
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }


  /* ============================================================
                CATEGORIES SLIDER (AUTO + MANUAL)
  ============================================================ */

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

    this.restartTimer = setTimeout(() => {
      this.startAutoScroll();
    }, 2000);
  }


  /* ============================================================
                   FEATURED PRODUCTS SLIDER
  ============================================================ */

  nextProduct() {
    if (this.productsGrid)
      this.productsGrid.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  prevProduct() {
    if (this.productsGrid)
      this.productsGrid.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

}
