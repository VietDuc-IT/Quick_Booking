function Map({ data }) {
    return (
        <>
            <div>
                <p class="font-semibold text-gray-900 dark:text-white mb-3">Xem bản đồ</p>
                <iframe
                    title="google map"
                    src={data?.map}
                    width="100%"
                    height="400"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    );
}

export default Map;
