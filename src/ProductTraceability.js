import React, { useState } from 'react';
import { MapPin, Leaf, Award, Truck, ThermometerSun, Droplets, QrCode, Upload } from 'lucide-react';

const ProductTraceability = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getStepIcon = (name) => {
    switch (true) {
      case name.toLowerCase().includes('farm'):
        return <Leaf className="text-white" size={20} />;
      case name.toLowerCase().includes('packaging'):
        return <Truck className="text-white" size={20} />;
      case name.toLowerCase().includes('store'):
        return <MapPin className="text-white" size={20} />;
      default:
        return <MapPin className="text-white" size={20} />;
    }
  };

  const renderJourneyPoint = (point, index) => (
    <div key={point.id} className="flex items-start space-x-4 mb-8">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
          {getStepIcon(point.name)}
        </div>
      </div>
      <div className="flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{point.name}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {new Date(point.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {point.temperature && (
              <div className="flex items-center p-2 bg-blue-50 rounded-lg">
                <ThermometerSun size={18} className="text-blue-500 mr-2" />
                <span className="text-sm font-medium text-blue-700">{point.temperature}</span>
              </div>
            )}
            {point.humidity && (
              <div className="flex items-center p-2 bg-teal-50 rounded-lg">
                <Droplets size={18} className="text-teal-500 mr-2" />
                <span className="text-sm font-medium text-teal-700">{point.humidity}</span>
              </div>
            )}
            {point.transportMethod && (
              <div className="flex items-center p-2 bg-purple-50 rounded-lg">
                <Truck size={18} className="text-purple-500 mr-2" />
                <span className="text-sm font-medium text-purple-700">{point.transportMethod}</span>
              </div>
            )}
            {point.inspectionStatus && (
              <div className="flex items-center p-2 bg-amber-50 rounded-lg">
                <Award size={18} className="text-amber-500 mr-2" />
                <span className="text-sm font-medium text-amber-700">
                  Inspection: {point.inspectionStatus}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const products = [
    {
      id: "1",
      name: "Organic Tomatoes",
      farmName: "Green Valley Farm",
      harvestDate: "2024-03-15",
      certifications: ["Organic", "Non-GMO", "Sustainable"],
      journey: [
        {
          id: "1",
          name: "Farm Harvest",
          date: "2024-03-15",
          temperature: "24°C",
          humidity: "65%",
          inspectionStatus: "Passed"
        },
        {
          id: "2",
          name: "Local Distribution Center",
          date: "2024-03-16",
          temperature: "22°C",
          transportMethod: "Refrigerated Truck"
        },
        {
          id: "3",
          name: "Quality Control",
          date: "2024-03-17",
          inspectionStatus: "Passed"
        },
        {
          id: "4",
          name: "Retail Store",
          date: "2024-03-18",
          temperature: "20°C",
          humidity: "60%"
        }
      ]
    },
    {
      id: "2",
      name: "Free-Range Eggs",
      farmName: "Happy Hens Farm",
      harvestDate: "2024-03-14",
      certifications: ["Free-Range", "Organic"],
      journey: [
        {
          id: "1",
          name: "Farm Collection",
          date: "2024-03-14",
          temperature: "18°C",
          inspectionStatus: "Passed"
        },
        {
          id: "2",
          name: "Packaging Facility",
          date: "2024-03-15",
          temperature: "16°C",
          humidity: "55%"
        },
        {
          id: "3",
          name: "Regional Distribution",
          date: "2024-03-16",
          transportMethod: "Temperature-Controlled Van"
        },
        {
          id: "4",
          name: "Retail Store",
          date: "2024-03-17",
          temperature: "15°C",
          humidity: "50%"
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Farm-to-Table Traceability
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Track your food's journey from the farm to your table, ensuring quality and transparency at every step.
        </p>
      </div>

      <div className="text-center mb-6">
        <button 
          onClick={() => document.getElementById('qr-upload').click()}
          className="flex items-center justify-center space-x-2 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <QrCode size={20} />
          <span>Upload QR Code</span>
          <Upload size={20} />
        </button>
        <input
          id="qr-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              console.log('QR Code uploaded:', e.target.files[0]);
            }
          }}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select a Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedProduct?.id === product.id
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Leaf className="text-green-500 h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">{product.farmName}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-600 mb-4">
              Harvested on {new Date(selectedProduct.harvestDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedProduct.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
            

          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-green-300 to-green-500" />
            {selectedProduct.journey.map((point, index) => renderJourneyPoint(point, index))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTraceability;