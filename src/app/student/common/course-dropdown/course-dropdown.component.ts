import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-dropdown',
  templateUrl: './course-dropdown.component.html',
  styleUrls: ['./course-dropdown.component.scss']
})
export class CourseDropdownComponent {

  searchQuery = "";
  courses = [
    {
      lastLearned: "6",
      shortDescription: "This is a wider card with supporting text.vsdv sfsdv sdbvsdv  sdbsdvbs sbvsdv sdvsdv sdvc ",
      name: "Home",
      id: "f2a7ade963334f6593f6f6c4809bf9ae",
      progress: 20,
      image: "data:image/jpeg;base64,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"
    },
    {
      lastLearned: "4",
      shortDescription: "This is a wider card with supporting text.vsdv sfsdv sdbvsdv  sdbsdvbs sbvsdv sdvsdv sdvc ",
      name: "Courses",
      id: "696b2903484247bc87c9e9593f39b05d",
      progress: 100,
      image: "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg"

    },
    {
      lastLearned: "2",
      shortDescription: "This is a wider card with supporting text.",
      name: "statistics statistics  statistics statistics statistics",
      id: "f2a7ade963334f6593f6f6c4809bf9ae",
      progress: 10,
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"

    }];
  filteredCourses = this.courses;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  clickOnCourse(id: string) {
    this.router.navigate([`/student/courses/${id}`]);
  }

  onSearchChange(newValue: any): void {
    this.searchQuery = newValue;
    this.filteredCourses = this.courses.filter(course => course.name.toLowerCase().trim().includes(this.searchQuery.toLowerCase().trim()));
  }

}
