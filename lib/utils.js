export function toWords(amount) {
    if (amount === 0) return 'Zero Rupees Only';

    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const convertLessThanOneThousand = (n) => {
        if (n === 0) return '';
        if (n < 10) return units[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
        return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanOneThousand(n % 100) : '');
    };

    const convert = (n) => {
        if (n === 0) return '';

        let result = '';

        // Crores
        if (n >= 10000000) {
            result += convert(Math.floor(n / 10000000)) + ' Crore ';
            n %= 10000000;
        }

        // Lakhs
        if (n >= 100000) {
            result += convertLessThanOneThousand(Math.floor(n / 100000)) + ' Lakh ';
            n %= 100000;
        }

        // Thousands
        if (n >= 1000) {
            result += convertLessThanOneThousand(Math.floor(n / 1000)) + ' Thousand ';
            n %= 1000;
        }

        if (n > 0) {
            result += convertLessThanOneThousand(n);
        }

        return result.trim();
    };

    const [integerPart, decimalPart] = amount.toString().split('.');
    let words = convert(Number(integerPart)) + ' Rupees';

    if (decimalPart && Number(decimalPart) > 0) {
        // Handle 2 decimal places properly
        const paisa = decimalPart.padEnd(2, '0').slice(0, 2);
        if (Number(paisa) > 0) {
            words += ' and ' + convertLessThanOneThousand(Number(paisa)) + ' Paisa';
        }
    }

    return words + ' Only';
}
