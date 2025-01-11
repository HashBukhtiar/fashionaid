import cv2

def main():
    # Read the image
    image = cv2.imread('images/WIN_20250111_13_36_23_Pro.jpg')

    # Check if the image was loaded successfully
    if image is None:
        print("Error: Could not load image.")
        return

    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Display the original image
    cv2.imshow('Original Image', image)

    # Display the grayscale image
    cv2.imshow('Grayscale Image', gray_image)

    # Wait for a key press and close the image windows
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()