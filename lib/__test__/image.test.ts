import { MOCK_IMGBB_RESPONSE } from "@/mocks";
import { fetchApi } from "../fetch";
import { uploadAndGetImageUrl } from "../image";

jest.mock("../fetch.ts");
describe("Image service test case", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFetchApi = fetchApi as jest.Mock;
  it("should return the image url", async () => {
    mockFetchApi.mockResolvedValueOnce(MOCK_IMGBB_RESPONSE);

    const mockFormData: FormData = new FormData();

    const mockImageFile = new File([new Uint8Array(1024)], "mockImage.png", {
      type: "image/png",
    });

    mockFormData.append("image", mockImageFile);

    const result = await uploadAndGetImageUrl(mockImageFile);

    expect(result).toEqual(MOCK_IMGBB_RESPONSE.data.url);
  });
});
