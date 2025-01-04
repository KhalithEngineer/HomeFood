import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface AddressFormProps {
  onSubmit: (address: {
    addressLine1: string;
    addressLine2: string;
    area: string;
    pincode: string;
    landmark: string;
  }) => void;
  loading?: boolean;
}

const AddressForm = ({ onSubmit, loading = false }: AddressFormProps) => {
  const [error, setError] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const address = {
      addressLine1: formData.get("addressLine1") as string,
      addressLine2: formData.get("addressLine2") as string,
      area: formData.get("area") as string,
      pincode: formData.get("pincode") as string,
      landmark: formData.get("landmark") as string,
    };

    // Validate Chennai pincode (600001 to 600100)
    const pincodeNum = parseInt(address.pincode);
    if (isNaN(pincodeNum) || pincodeNum < 600001 || pincodeNum > 600100) {
      setError("Please enter a valid Chennai pincode (600001-600100)");
      return;
    }

    setError("");
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="addressLine1">Address Line 1 *</Label>
        <Input
          id="addressLine1"
          name="addressLine1"
          placeholder="House/Flat No., Building Name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine2">Address Line 2</Label>
        <Input
          id="addressLine2"
          name="addressLine2"
          placeholder="Street Name, Area"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">Area *</Label>
        <Input
          id="area"
          name="area"
          placeholder="e.g., T. Nagar, Adyar"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode *</Label>
        <Input
          id="pincode"
          name="pincode"
          placeholder="Chennai pincode"
          pattern="^6000[0-9]{2}$"
          title="Enter a valid Chennai pincode"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="landmark">Landmark</Label>
        <Input id="landmark" name="landmark" placeholder="Near..." />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        <MapPin className="w-4 h-4 mr-2" />
        {loading ? "Saving..." : "Save Address"}
      </Button>
    </form>
  );
};

export default AddressForm;
