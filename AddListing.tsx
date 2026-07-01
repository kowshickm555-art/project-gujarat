import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Store,
  Wrench,
  PartyPopper,
  MapPinned,
  Briefcase,
  Home,
  Upload,
  X,
  Sparkles,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const categories = [
  { id: 'shops', name: 'Shops', icon: Store },
  { id: 'services', name: 'Services', icon: Wrench },
  { id: 'entertainment', name: 'Entertainment', icon: PartyPopper },
  { id: 'tourism', name: 'Tourism', icon: MapPinned },
  { id: 'jobs', name: 'Jobs', icon: Briefcase },
  { id: 'rentals', name: 'Rentals', icon: Home },
];

const steps = [
  { id: 1, title: 'Category' },
  { id: 2, title: 'Details' },
  { id: 3, title: 'Pricing' },
  { id: 4, title: 'Photos' },
  { id: 5, title: 'Preview' },
];

export default function AddListing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    priceType: 'fixed',
    location: '',
    phone: '',
    photos: [] as string[],
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setFormData({ ...formData, category: categoryId });
  };

  const handleGenerateDescription = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setFormData({
        ...formData,
        description:
          'Your trusted neighborhood destination for quality products and exceptional service. We pride ourselves on offering the best selection at competitive prices, with a focus on customer satisfaction.',
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    // In real app, this would save the listing
    navigate('/seller/listings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-seller/5 to-transparent">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/seller/listings')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Listing</h1>
            <p className="text-muted-foreground text-sm">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentStep > step.id
                    ? 'bg-success text-success-foreground'
                    : currentStep === step.id
                    ? 'bg-seller text-seller-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    currentStep > step.id ? 'bg-success' : 'bg-secondary'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 mb-6">
          {/* Step 1: Category */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Select a Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.category === cat.id
                          ? 'border-seller bg-seller/5'
                          : 'border-border hover:border-seller/50'
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 mx-auto mb-2 ${
                          formData.category === cat.id ? 'text-seller' : 'text-muted-foreground'
                        }`}
                      />
                      <p className="font-medium text-center">{cat.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Basic Details</h2>

              <div>
                <Label htmlFor="title">Listing Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Green Leaf Organic Store"
                  className="mt-1"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="text-seller"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    {isGenerating ? 'Generating...' : 'AI Generate'}
                  </Button>
                </div>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your business or listing..."
                  className="mt-1 min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="location">Location / Address</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your business address"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Price & Availability</h2>

              <div>
                <Label>Price Type</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {['fixed', 'range', 'negotiable'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, priceType: type })}
                      className={`py-3 rounded-lg border-2 font-medium capitalize transition-all ${
                        formData.priceType === type
                          ? 'border-seller bg-seller/5 text-seller'
                          : 'border-border hover:border-seller/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  💡 Tip: Similar listings in your area are priced between ₹500-₹1,500
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Photos */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Add Photos</h2>

              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium mb-1">Upload Photos</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop or click to select
                </p>
                <Button variant="outline">Select Files</Button>
              </div>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            photos: formData.photos.filter((_, i) => i !== index),
                          })
                        }
                        className="absolute top-2 right-2 p-1 rounded-full bg-card/90"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Preview */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Preview Your Listing</h2>

              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
                  {formData.photos.length > 0 ? (
                    <img
                      src={formData.photos[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    'No photos added'
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">
                  {formData.title || 'Listing Title'}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {formData.description || 'No description provided'}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-primary font-semibold">
                    ₹{formData.price || '---'}
                  </span>
                  <span className="text-muted-foreground">
                    {formData.location || 'No location set'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-success/10 rounded-xl">
                <Check className="h-5 w-5 text-success" />
                <p className="text-sm">
                  Your listing looks great! Click Publish to make it live.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              disabled={currentStep === 1 && !formData.category}
              className="mode-toggle-seller border-0"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handlePublish} className="mode-toggle-seller border-0">
              <Check className="h-4 w-4 mr-2" />
              Publish Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
