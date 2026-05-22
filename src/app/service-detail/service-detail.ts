import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css'
})
export class ServiceDetail implements OnInit {
  serviceId: string | null = null;
  serviceTitle: string = '';
  serviceDescription: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id');
      this.loadServiceDetails();
    });
  }

  private loadServiceDetails(): void {
    if (this.serviceId === 'web-development') {
      this.serviceTitle = 'Web Development Services';
      this.serviceDescription = 'We build robust and scalable web applications using the latest technologies. From simple landing pages to complex enterprise solutions, our team has the expertise to bring your vision to life.';
    } else if (this.serviceId === 'ui-ux-design') {
      this.serviceTitle = 'UI/UX Design Services';
      this.serviceDescription = 'Our design team crafts intuitive and engaging user interfaces. We focus on user experience to ensure your customers have a seamless interaction with your product.';
    } else if (this.serviceId === 'seo-optimization') {
      this.serviceTitle = 'SEO Optimization Services';
      this.serviceDescription = 'Improve your search engine rankings and drive organic traffic to your website. We implement proven strategies to enhance your online visibility.';
    } else {
      this.serviceTitle = 'Service Not Found';
      this.serviceDescription = 'The service you are looking for does not exist.';
    }
  }
}
