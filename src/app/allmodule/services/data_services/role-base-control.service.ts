import { Injectable } from '@angular/core';
interface Feature {
  featureId: number;
  featureName: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RoleBaseControlService {

  constructor() {
    this.loadFeaturesFromStorage();
    this.setGlobalPermissions();
   }
  private features: { [key: string]: Feature } = {};

  private saveFeaturesToStorage() {
    localStorage.setItem('features', JSON.stringify(this.features));
  }

  private loadFeaturesFromStorage() {
    const storedFeatures = localStorage.getItem('features');
    if (storedFeatures) {
      this.features = JSON.parse(storedFeatures);
    }
  }

  setFeatures(features: Feature[]) {
    this.features = {};
    features.forEach(feature => {
      const normalizedFeatureName = feature.featureName.trim().toLowerCase().replace(/\s+/g, ' ');
      this.features[normalizedFeatureName] = feature;
    });
    this.saveFeaturesToStorage();
    this.setGlobalPermissions();
  }

  hasViewPermission(featureName: string): boolean {
    const normalizedFeatureName = this.normalizeFeatureName(featureName);
    return this.features[normalizedFeatureName]?.view || false;
  }

  hasEditPermission(featureName: string): boolean {
    const normalizedFeatureName = this.normalizeFeatureName(featureName);
    return this.features[normalizedFeatureName]?.edit || false;
  }

  hasDeletePermission(featureName: string): boolean {
    const normalizedFeatureName = this.normalizeFeatureName(featureName);
    return this.features[normalizedFeatureName]?.delete || false;
  }

  hasAddPermission(featureName: string): boolean {
    const normalizedFeatureName = this.normalizeFeatureName(featureName);
    return this.features[normalizedFeatureName]?.add || false;
  }

  private normalizeFeatureName(featureName: string): string {
    return featureName.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  // Define global permissions
  public canViewUsers: boolean = false;
  public canEditUsers: boolean = false;
  public canDeleteUsers: boolean = false;
  public canAddUsers: boolean = false;

  public canViewSuppliers: boolean = false;
  public canEditSuppliers: boolean = false;
  public canDeleteSuppliers: boolean = false;
  public canAddSuppliers: boolean = false;

  public canViewCustomers: boolean = false;
  public canEditCustomers: boolean = false;
  public canDeleteCustomers: boolean = false;
  public canAddCustomers: boolean = false;

  public canViewProducts: boolean = false;
  public canEditProducts: boolean = false;
  public canDeleteProducts: boolean = false;
  public canAddProducts: boolean = false;

  public canViewPurchases: boolean = false;
  public canEditPurchases: boolean = false;
  public canDeletePurchases: boolean = false;
  public canAddPurchases: boolean = false;

  public canViewSales: boolean = false;
  public canEditSales: boolean = false;
  public canDeleteSales: boolean = false;
  public canAddSales: boolean = false;

  public canViewExpenses: boolean = false;
  public canEditExpenses: boolean = false;
  public canDeleteExpenses: boolean = false;
  public canAddExpenses: boolean = false;

  public canViewReports: boolean = false;
  public canEditReports: boolean = false;
  public canDeleteReports: boolean = false;
  public canAddReports: boolean = false;

  private setGlobalPermissions() {
    this.canViewUsers = this.hasViewPermission('user management');
    this.canEditUsers = this.hasEditPermission('user management');
    this.canDeleteUsers = this.hasDeletePermission('user management');
    this.canAddUsers = this.hasAddPermission('user management');

    this.canViewSuppliers = this.hasViewPermission('supplier management');
    this.canEditSuppliers = this.hasEditPermission('supplier management');
    this.canDeleteSuppliers = this.hasDeletePermission('supplier management');
    this.canAddSuppliers = this.hasAddPermission('supplier management');

    this.canViewCustomers = this.hasViewPermission('customer management');
    this.canEditCustomers = this.hasEditPermission('customer management');
    this.canDeleteCustomers = this.hasDeletePermission('customer management');
    this.canAddCustomers = this.hasAddPermission('customer management');

    this.canViewProducts = this.hasViewPermission('products management');
    this.canEditProducts = this.hasEditPermission('products management');
    this.canDeleteProducts = this.hasDeletePermission('products management');
    this.canAddProducts = this.hasAddPermission('products management');

    this.canViewPurchases = this.hasViewPermission('purchase management');
    this.canEditPurchases = this.hasEditPermission('purchase management');
    this.canDeletePurchases = this.hasDeletePermission('purchase management');
    this.canAddPurchases = this.hasAddPermission('purchase management');

    this.canViewSales = this.hasViewPermission('sales management');
    this.canEditSales = this.hasEditPermission('sales management');
    this.canDeleteSales = this.hasDeletePermission('sales management');
    this.canAddSales = this.hasAddPermission('sales management');

    this.canViewExpenses = this.hasViewPermission('expenses management');
    this.canEditExpenses = this.hasEditPermission('expenses management');
    this.canDeleteExpenses = this.hasDeletePermission('expenses management');
    this.canAddExpenses = this.hasAddPermission('expenses management');

    this.canViewReports = this.hasViewPermission('report management');
    this.canEditReports = this.hasEditPermission('report management');
    this.canDeleteReports = this.hasDeletePermission('report management');
    this.canAddReports = this.hasAddPermission('report management');


  }


}


