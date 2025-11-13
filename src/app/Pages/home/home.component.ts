import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];

  @ViewChild('categoryGrid') categoryGrid!: ElementRef;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error(error)
    );
  }

  scrollLeft() {
    this.categoryGrid.nativeElement.scrollBy({
      left: -250, // distance en pixels à scroller
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.categoryGrid.nativeElement.scrollBy({
      left: 250, // distance en pixels à scroller
      behavior: 'smooth'
    });
  }
}

